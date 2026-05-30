---
title: "DR Programme Anatomy"
lesson: "00-05-programme-anatomy"
artifact: "programme-anatomy.md"
tags: ["fundamentals", "programme", "governance", "ownership", "evidence"]
---

# DR Programme Status

**Organisation:** _______________  
**Last reviewed:** _______________  
**Next review:** _______________  
**DR Owner:** _______________

---

## Component Status

| Component | Owner | Status | Last Updated | Next Review | Notes |
|-----------|-------|--------|-------------|------------|-------|
| Policy & Targets | | ☐ G ☐ A ☐ R | | | |
| Risk Assessment / BIA | | ☐ G ☐ A ☐ R | | | |
| Recovery Group Maps | | ☐ G ☐ A ☐ R | | | |
| Replication Configuration | | ☐ G ☐ A ☐ R | | | |
| Monitoring & Alerting | | ☐ G ☐ A ☐ R | | | |
| Drill Schedule & Records | | ☐ G ☐ A ☐ R | | | |
| Compliance Evidence | | ☐ G ☐ A ☐ R | | | |

---

## Ownership Map

| Role | Name | Responsibilities |
|------|------|----------------|
| DR Owner (Executive) | | Programme accountability, policy sign-off, audit response |
| Technical DR Lead | | Replication config, monitoring, drill execution |
| Application Owners (list) | | Recovery Group validation, application-level recovery approval |
| Compliance Lead | | Evidence collection, regulatory mapping, audit preparation |

---

## Evidence Chain — Current Status

| Evidence type | Location | Last updated | Status |
|-------------|----------|-------------|--------|
| RPO/RTO policy | | | ☐ Current ☐ Stale |
| Recovery Group mappings | | | ☐ Current ☐ Stale |
| Replication config docs | | | ☐ Current ☐ Stale |
| Lag monitoring history | | | ☐ Continuous ☐ Point-in-time ☐ None |
| Last drill results | | | ☐ < 6 months ☐ 6–12 months ☐ > 12 months |
| Compliance mapping | | | ☐ Current ☐ Stale |

---

## Quarterly Review Agenda

1. Evidence chain review — any gaps in the chain since last quarter?
2. RPO/RTO measurement — any breaches in the last quarter? Root cause?
3. Drill results — RTA vs RTO for each drill. Gaps and remediation?
4. Infrastructure changes — any new systems, replication config changes, topology changes?
5. Compliance updates — any regulatory changes affecting programme requirements?
6. Action items from last review — closed?
