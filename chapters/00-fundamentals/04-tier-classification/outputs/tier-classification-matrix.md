---
title: "Tier Classification Matrix"
lesson: "00-04-tier-classification"
artifact: "tier-classification-matrix.md"
tags: ["fundamentals", "tier", "classification", "policy", "compliance"]
---

# DR Tier Classification Matrix

**Organisation:** _______________  
**Version:** _______________  
**Last reviewed:** _______________  
**Review cycle:** Annual (or after significant business change)

---

## Tier Definitions

| Tier | RPO | RTO | Business Impact |
|------|-----|-----|----------------|
| Tier 0 | Seconds | Minutes | Zero data loss — regulatory requirement |
| Tier 1 | < 1 hour | < 2 hours | Direct revenue or regulatory penalty |
| Tier 2 | < 4 hours | < 8 hours | Significant operational disruption |
| Tier 3 | 24 hours | 48 hours | Tolerable, manual workaround exists |
| Tier 4 | Best effort | Best effort | Internal/dev — no SLA |

---

## Application Classification

| Application | Business Function | Owner | Classified Tier | RPO Target | RTO Target | DR Configured? | Gap |
|-------------|------------------|-------|----------------|-----------|-----------|----------------|-----|
| | | | | | | ☐ Yes ☐ No | |
| | | | | | | ☐ Yes ☐ No | |
| | | | | | | ☐ Yes ☐ No | |
| | | | | | | ☐ Yes ☐ No | |
| | | | | | | ☐ Yes ☐ No | |

---

## Regulatory Mapping

For organisations under SAMA, NCA, ISO 22301, or DORA:

| Application | Regulation | Control Ref | Required Tier | Configured Tier | Status |
|-------------|-----------|-------------|--------------|----------------|--------|
| | SAMA BCM | BCM-1.2 | | | ☐ Compliant ☐ Gap |
| | NCA ECC-2 | CCC-1.1 | | | ☐ Compliant ☐ Gap |
| | ISO 22301 | 8.3 | | | ☐ Compliant ☐ Gap |
| | DORA | Art. 11 | | | ☐ Compliant ☐ Gap |

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| CISO | | |
| Business Continuity Manager | | |
| Compliance | | |
| CTO / CIO | | |
