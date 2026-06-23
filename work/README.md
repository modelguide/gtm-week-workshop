# work/ — your outputs land here

`data/` is the immutable source of truth — never edited. **Everything you and Claude produce
goes here in `work/`:** enriched contact lists, `target-board.csv`, dashboards, drafts.

The loop: **enrich → save back here → reload the viewer.** A data viewer reads `data/` (the
spine) + `work/` (your changes) together, so when you re-open / re-render it, your enriched
board shows up. Delete anything in `work/` to reset; `data/` is untouched.
