---
title: "RPO/RTO Worksheet"
lesson: "00-01-rpo-rto"
artifact: "rpo-rto-worksheet.md"
tags: ["fundamentals", "rpo", "rto", "policy", "measurement"]
---

# RPO/RTO Worksheet

Use this worksheet to capture declared targets vs measured reality for each protected workload.
Review quarterly. Update after any infrastructure change that affects replication.

**Completed by:** _______________  
**Date:** _______________  
**Review frequency:** Quarterly

---

## Tier 1 Workloads

| Workload | System | Tech | Declared RPO | Declared RTO | Measured Lag (avg) | Measured Lag (peak) | Last Measured | Status |
|----------|--------|------|-------------|-------------|-------------------|--------------------|--------------|-|
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |

**Notes (Tier 1):**

---

## Tier 2 Workloads

| Workload | System | Tech | Declared RPO | Declared RTO | Measured Lag (avg) | Last Measured | Status |
|----------|--------|------|-------------|-------------|-------------------|--------------|-|
| | | | | | | | |
| | | | | | | | |

---

## Gap Analysis

### Workloads Where Measured Lag Exceeds Declared RPO

| Workload | Declared RPO | Peak Lag | Gap | Root Cause | Remediation | Target Date |
|----------|-------------|----------|-----|-----------|------------|------------|
| | | | | | | |

---

## Infrastructure Constraints

Document why certain targets cannot be met today:

| Workload | Constraint | Impact on RPO | Mitigation |
|----------|-----------|--------------|-----------|
| | | | |

---

## Measurement Method

| Workload | Tool / Method | Command / Query | Frequency |
|----------|-------------|----------------|-----------|
| | `rpo-probe` | `rpo-probe check --workload <name>` | Continuous |
| | Oracle DG | `SELECT NAME, VALUE FROM V$DATAGUARD_STATS` | Manual |
| | | | |

---

## Sign-off

| Role | Name | Date | Notes |
|------|------|------|-------|
| DR Owner | | | |
| System Owner | | | |
| Compliance | | | |
