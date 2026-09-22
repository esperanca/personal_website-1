# Revision Log — when-data-is-clean-semantic-failures.md

## Version 0.1.3

**Date:** 2026-09-22  
**Editor:** Daniel Vieira Souza  
**Document:** `when-data-is-clean-semantic-failures.md`  
**Previous version:** `0.1.2`  
**New version:** `0.1.3`  
**Change type:** Diagram replacement / visual structure / documentation traceability

---

## Summary

This revision replaces the ASCII-art `System Flow` block with a compact Mermaid diagram. The change keeps the same conceptual flow while making the diagram easier to maintain, render, export, and version in Markdown.

The diagram uses Inter as the preferred typeface through Mermaid theme variables, with a system font fallback stack for environments where Inter is unavailable.

---

## Changes Made

### 1. Front matter

**Change:** Updated the document version.

```yaml
version: "0.1.3"
```

---

### 2. System Flow diagram

**Section changed:** `System Flow`

**Previous state:** ASCII-art diagram inside a plain Markdown code block.

**New state:** Mermaid flowchart using the compact article version of the diagram.

**Diagram format:**

```markdown
```mermaid
...
```
```

**Typeface setting:**

```json
"fontFamily": "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
```

---

## Diagram Content Preserved

The new diagram preserves the same high-level structure as the previous `System Flow` block:

| Original concept | New Mermaid representation |
|---|---|
| Agent execution | `User query` → `Agent` → `Agent response with execution traces` |
| Track 1 | `Deterministic telemetry` / `Execution validation` |
| Track 2 | `Stratified human judgment` / `Understanding evaluation` |
| Track 3 | `Comprehension-focused judge` / `Scaled evaluation` |
| Aggregation | `Aggregation — Combine signals from all tracks` |
| Deployment decision | `Ready for deployment?` |
| Human review loop | `Human review` → `Agent` |
| Production feedback loop | `Deploy` → `Production monitoring` → `Track 2` |

---

## Editorial Rationale

The previous ASCII diagram was technically accurate but visually dense and difficult to maintain. It also duplicated explanatory content already present in the surrounding section.

The compact Mermaid version is more appropriate for the article body because it:

1. Keeps the system architecture visible without overwhelming the reader.
2. Preserves the three-track evaluation structure.
3. Supports rendering in Markdown-first publishing workflows.
4. Makes future edits safer because each diagram element is structured text.
5. Separates visual hierarchy from prose detail.

The more detailed Mermaid version discussed during review was not added. The article now uses only the simple version, as requested.

---

## Decisions

| Decision | Rationale |
|---|---|
| Use the compact Mermaid version only | The user requested the simple version for the current article. |
| Keep the article filename unchanged | The article should remain `when-data-is-clean-semantic-failures.md`. |
| Bump version to `0.1.3` | This is a material editorial/layout change after `0.1.2`. |
| Add a separate full revision log | The established revision process uses a simplified article log plus detailed external logs. |
| Use Inter as preferred typeface | The user explicitly requested Inter. |
| Use a font fallback stack | Mermaid rendering environments may not always load Inter. |
| Do not add the detailed Mermaid diagram | The requested change was limited to the simple version. |

---

## Verification Notes

The revision was checked for the following:

| Check | Status |
|---|---|
| Article filename remains unchanged | Passed |
| Front matter version updated | Passed |
| ASCII diagram removed | Passed |
| Mermaid block inserted | Passed |
| Inter included in Mermaid theme variables | Passed |
| Simplified revision history updated | Passed |
| Full revision log created | Passed |

---

## Files Changed

| File | Purpose |
|---|---|
| `when-data-is-clean-semantic-failures.md` | Revised article with Mermaid system flow |
| `revision-logs/when-data-is-clean-semantic-failures-v0.1.3-log.md` | Full revision log for this change |
