# drplaybook.com — Project Context

**Status:** Active development  
**Repo:** `github.com/kontinuity-io/drplaybook` (not yet created)  
**Operator:** Kontinuity Labs (disclosed in footer/about)

---

## What This Is

`drplaybook.com` is a practitioner's field manual for disaster recovery. Eight chapters, ~47 lessons. Audience: SRE/DevOps/cloud ops engineers who own DR at their organisation.

It is NOT: vendor docs, a certification program, a product showcase.  
It IS: the resource you'd bookmark when your boss asks "is our DR programme actually valid?"

**Stealth marketing role:** Introduces the RecoveryGroup mental model organically. "USE IT" sections reference Kontinuity OSS tools. Chapter 8 is the full OSS tooling chapter. No Kontinuity platform mention until v0.1 GA.

---

## Design Principles

1. **One artifact per lesson.** Every lesson ships a reusable runbook, checklist, policy snippet, or OpenDRC YAML. Not a grade, not a badge.
2. **7-beat structure, every lesson.** MOTTO → PROBLEM → CONCEPT → BUILD IT → USE IT → SHIP IT → EVALUATE IT. No deviation.
3. **Real-world checks.** One after BUILD IT (`> **Real-world check:**`), one after USE IT (`> **Perspective shift:**`). Exactly two per lesson.
4. **DR domain adaptation of BUILD IT/USE IT:** BUILD IT = do this manually (runbook fragment). USE IT = tool that automates it (references Kontinuity OSS tools where applicable).

---

## Content Structure

```
chapters/
  NN-chapter-name/
    README.md              (chapter overview, lesson table, through-line)
    NN-lesson-name/
      docs/en.md           (7-beat lesson content)
      docs/ar.md           (Arabic — Chapter 6 compliance lessons only)
      outputs/
        artifact-name.md   (downloadable artifact: runbook, checklist, OpenDRC YAML)
      checks.json          (6-8 scenario-based self-check questions)
```

---

## Build System

```bash
node site/build.js      # generates site/data.js from ROADMAP.md + chapters/
npx serve .             # local preview
```

ROADMAP.md is the source of truth. Change a glyph (⬚ → ✅) and the lesson appears.

---

## Design Tokens

- Background: `#090909`
- Surface: `#101010`, `#171717`, `#1e1e1e`
- Accent: `#f59e0b` (amber — DR/alerting appropriate, distinct from Kontinuity's `#ff6b00`)
- Green: `#34d399` (complete status)
- Font: system-ui, monospace for logo/code

---

## Lesson Template (en.md frontmatter)

```
**Type:** Build  
**Tools:** rpo-probe, prometheus  
**Prerequisites:** Chapter 00, Lesson 01  
**Time:** ~45 min  
**Chapter:** 00 — DR Fundamentals
```

---

## Artifact Format (outputs/*.md)

```yaml
---
title: "RPO/RTO Worksheet"
lesson: "00-01-rpo-rto"
artifact: "rpo-rto-worksheet.md"
tags: ["fundamentals", "rpo", "rto", "policy"]
---
```

---

## Status

- Chapters 0–3: ✅ content in progress (parallel with Kontinuity OSS Week 1–4)
- Chapters 4–7: ⬚ planned (OSS Week 5–10)
- Chapter 8: ⬚ planned (lands with getkontinuity.com/oss umbrella post, Week 11)
- Chapter 6 (compliance): Arabic translation planned; English first

---

## Language

English primary. Arabic for Chapter 6 compliance lessons only (SAMA/NCA are GCC-specific). The site infrastructure supports bilingual from day one (same approach as appliedaifromscratch.com) but Arabic is not activated at launch.
