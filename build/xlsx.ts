/**
 * xlsx.ts — minimal real .xlsx writer (OOXML, zipped via the system `zip`).
 *
 * No npm xlsx dependency: we emit the handful of OOXML parts a valid workbook needs,
 * using inline-string cells (no sharedStrings table), then zip them with the macOS/Linux
 * `zip` CLI. Opens cleanly in Excel, Numbers, Google Sheets, and Claude.
 */
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

export type Cell = string | number | null;

function colRef(i: number): string {
  let s = '', n = i;
  do { s = String.fromCharCode(65 + (n % 26)) + s; n = Math.floor(n / 26) - 1; } while (n >= 0);
  return s;
}
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function cellXml(r: number, ci: number, v: Cell, boldRows: Set<number>): string {
  const ref = `${colRef(ci)}${r}`;
  const style = boldRows.has(r) ? ' s="1"' : '';
  if (v === null || v === '') return `<c r="${ref}"${style}/>`;
  if (typeof v === 'number') return `<c r="${ref}"${style}><v>${v}</v></c>`;
  return `<c r="${ref}"${style} t="inlineStr"><is><t xml:space="preserve">${esc(String(v))}</t></is></c>`;
}

/** Write `rows` to a single-sheet .xlsx at `outPath`. boldRowIdx are 0-based row indices rendered bold. */
export function writeXlsx(outPath: string, sheetName: string, rows: Cell[][], boldRowIdx: number[] = []): void {
  const bold = new Set(boldRowIdx.map(i => i + 1)); // 1-based
  const sheetRows = rows.map((row, ri) =>
    `<row r="${ri + 1}">${row.map((c, ci) => cellXml(ri + 1, ci, c, bold)).join('')}</row>`
  ).join('');
  const maxCols = Math.max(...rows.map(r => r.length));
  const dim = `A1:${colRef(maxCols - 1)}${rows.length}`;

  const sheetXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="${dim}"/><sheetData>${sheetRows}</sheetData></worksheet>`;

  const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${esc(sheetName)}" sheetId="1" r:id="rId1"/></sheets></workbook>`;

  const workbookRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;

  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="1"><fill><patternFill patternType="none"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs></styleSheet>`;

  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`;

  const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;

  const dir = mkdtempSync(join(tmpdir(), 'xlsx-'));
  mkdirSync(join(dir, '_rels'));
  mkdirSync(join(dir, 'xl', '_rels'), { recursive: true });
  mkdirSync(join(dir, 'xl', 'worksheets'), { recursive: true });
  writeFileSync(join(dir, '[Content_Types].xml'), contentTypes);
  writeFileSync(join(dir, '_rels', '.rels'), rootRels);
  writeFileSync(join(dir, 'xl', 'workbook.xml'), workbookXml);
  writeFileSync(join(dir, 'xl', '_rels', 'workbook.xml.rels'), workbookRels);
  writeFileSync(join(dir, 'xl', 'styles.xml'), stylesXml);
  writeFileSync(join(dir, 'xl', 'worksheets', 'sheet1.xml'), sheetXml);

  const tmpZip = join(dir, 'out.xlsx');
  // [Content_Types].xml must be first/stored is not required, but zip the package contents.
  execSync(`cd '${dir}' && zip -q -X -r out.xlsx '[Content_Types].xml' _rels xl`, { stdio: 'ignore' });
  copyFileSync(tmpZip, outPath);
  rmSync(dir, { recursive: true, force: true });
}
