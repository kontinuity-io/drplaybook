---
title: "Recovery Group Mapping Template"
lesson: "00-03-recovery-groups"
artifact: "recovery-group-template.md"
tags: ["fundamentals", "recovery-group", "dependency", "mapping", "policy"]
---

# Recovery Group: [NAME]

**Application:** _______________  
**Business function:** _______________  
**Tier:** ☐ Tier 1 (Mission Critical)  ☐ Tier 2 (Business Critical)  ☐ Tier 3 (Standard)  
**Owner:** _______________  
**Last updated:** _______________

---

## Components

| # | Component | Type | Replication Tech | Primary Location | DR Location | Current Lag | Coverage |
|---|-----------|------|-----------------|-----------------|------------|-------------|---------|
| 1 | | Database | | | | | ☐ Protected ☐ Gap |
| 2 | | App Server | | | | | ☐ Protected ☐ Gap |
| 3 | | Load Balancer | | | | | ☐ Protected ☐ Gap |
| 4 | | Cache / Queue | | | | | ☐ Protected ☐ Gap |
| 5 | | Object Storage | | | | | ☐ Protected ☐ Gap |
| 6 | | DNS / Routing | | | | | ☐ Protected ☐ Gap |
| 7 | | Secrets / Certs | | | | | ☐ Protected ☐ Gap |
| 8 | | Other | | | | | ☐ Protected ☐ Gap |

**Coverage gaps (components with no DR):**

---

## Dependency Order (Recovery Startup Sequence)

List components in the order they must be started during recovery. Each step requires validation before the next begins.

| Step | Component | Validation Check | Expected Time |
|------|-----------|-----------------|--------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

---

## Targets

| Metric | Declared Target | Worst-Case Measured | Status |
|--------|----------------|--------------------|-|
| RPO | | | ☐ Achievable ☐ Gap |
| RTO | | | ☐ Achievable ☐ Gap |
| Effective RPO (slowest component) | N/A | | — |

**Notes on achievability:**

---

## Approval Gate

Who must approve DR invocation for this Recovery Group?

| Role | Name | Contact | Authority |
|------|------|---------|---------|
| Primary approver | | | |
| Backup approver | | | |
| Technical lead on recovery | | | |

**Invocation condition:** _______________  
(e.g., "Primary site unavailable for > 30 min AND primary approver unreachable for > 15 min")

---

## Evidence Pointers

| Evidence type | Location | Updated |
|-------------|----------|---------|
| Replication lag history | | |
| Last drill result | | |
| RTA vs RTO record | | |
| Compliance mapping | | |
