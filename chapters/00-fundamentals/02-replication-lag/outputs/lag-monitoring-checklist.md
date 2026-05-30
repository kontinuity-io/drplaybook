---
title: "Replication Lag Monitoring Checklist"
lesson: "00-02-replication-lag"
artifact: "lag-monitoring-checklist.md"
tags: ["fundamentals", "replication", "lag", "monitoring", "baseline"]
---

# Replication Lag Monitoring Checklist

Use before setting or updating RPO targets. Establishes empirical baseline.

**Workload:** _______________  
**Technology:** _______________  
**Completed by:** _______________  
**Date:** _______________

---

## Baseline Sampling

Sample lag at these four time windows over a 7-day period:

| Day | 9am | 2pm | 7pm | 2am (next day) |
|-----|-----|-----|-----|----------------|
| Mon | | | | |
| Tue | | | | |
| Wed | | | | |
| Thu | | | | |
| Fri | | | | |
| Sat | | | | |
| Sun | | | | |

**Average lag:** ___  **Peak lag:** ___  **Batch window peak:** ___

---

## RPO Validation

| Item | Value |
|------|-------|
| Declared RPO | |
| Worst-case measured lag | |
| Lag headroom (RPO minus worst-case) | |
| Is target achievable? | ☐ Yes  ☐ No  ☐ Marginal (< 20% headroom) |

---

## Lag Driver Identification

| Cause | Present? | Impact on lag | Mitigation |
|-------|----------|--------------|-----------|
| Nightly batch window | ☐ Yes ☐ No | | |
| Backup job contention | ☐ Yes ☐ No | | |
| Network congestion window | ☐ Yes ☐ No | | |
| Standby maintenance schedule | ☐ Yes ☐ No | | |
| Large transaction / bulk loads | ☐ Yes ☐ No | | |

---

## Monitoring Configuration

| Item | Status |
|------|--------|
| Continuous lag monitoring configured | ☐ Yes ☐ No |
| Alert threshold set (at what % of RPO?) | ___% |
| Breach alerting configured | ☐ Yes ☐ No |
| Alert destination | |
| Lag history retained for | ___ days |

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| DR Owner | | |
| System Owner | | |
