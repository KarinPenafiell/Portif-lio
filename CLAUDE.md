<!-- creative-ui:start -->
## Creative UI

This project uses Creative UI for art direction. Before changing frontend presentation:

1. Read `.creative-ui/design-dna.json` as the machine-readable source of truth.
2. Read `.creative-ui/DESIGN.md` for the interpreted design brief.
3. Use selected visual-lineage references as principle libraries, not literal themes.
4. Respect novelty budgets: unusual layout does not imply unusual navigation.
5. Run `creative-ui critique` before considering major frontend work complete.
6. If the result looks template-like, run `creative-ui unslop` and address structural findings rather than merely changing colors.

Creative UI is framework-agnostic. Do not introduce React, Tailwind, or another frontend dependency solely because Creative UI is present.
<!-- creative-ui:end -->
