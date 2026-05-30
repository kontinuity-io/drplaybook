# drplaybook.com — Roadmap

The practitioner's field manual for disaster recovery programmes. Eight chapters from fundamentals to active incident response. One downloadable artifact per lesson.

Operated by [Kontinuity Labs](https://getkontinuity.com) · Apache 2.0

---

## Chapter 00: DR Fundamentals [✅] (~5 hours)

| # | Lesson | Status | Time |
|---|--------|--------|------|
| 01 | RPO vs RTO — the measurement problem | ✅ | ~45 min |
| 02 | Replication lag — what it is, why it drifts | ✅ | ~50 min |
| 03 | Recovery Groups — grouping workloads that fail together | ✅ | ~40 min |
| 04 | Tier classification — who needs what SLA | ✅ | ~45 min |
| 05 | DR programme anatomy — components, ownership, evidence | ✅ | ~50 min |

## Chapter 01: Designing a DR Programme [🚧] (~7 hours)

| # | Lesson | Status | Time |
|---|--------|--------|------|
| 01 | Topology patterns — active-passive, active-active, pilot light | ⬚ | ~60 min |
| 02 | Dependency mapping — finding hidden coupling | ⬚ | ~70 min |
| 03 | Declaring targets — RPO/RTO per tier | ⬚ | ~55 min |
| 04 | DR policy document — structure, ownership, review cadence | ⬚ | ~50 min |
| 05 | Testing strategy — types of tests, frequency, scheduling | ⬚ | ~65 min |
| 06 | Change management — keeping DR in sync with production | ⬚ | ~40 min |

## Chapter 02: Replication Technologies [🚧] (~8.5 hours)

| # | Lesson | Status | Time |
|---|--------|--------|------|
| 01 | Oracle Data Guard — architecture, lag metrics, protection modes | ⬚ | ~70 min |
| 02 | VMware SRM — site pairing, protection groups, recovery plans | ⬚ | ~65 min |
| 03 | AWS DRS — replication agent, staging area, failover anatomy | ⬚ | ~60 min |
| 04 | Azure Site Recovery — vault, policy, test failover | ⬚ | ~60 min |
| 05 | NetApp SnapMirror — volume replication, lag metrics, fanout | ⬚ | ~55 min |
| 06 | Velero — K8s backup vs DR, restore order, PVC dependencies | ⬚ | ~60 min |
| 07 | Choosing a replication tool — decision framework | ⬚ | ~40 min |

## Chapter 03: Running DR Drills [🚧] (~6.5 hours)

| # | Lesson | Status | Time |
|---|--------|--------|------|
| 01 | Drill types — tabletop, non-disruptive test, live failover | ⬚ | ~50 min |
| 02 | Planning a drill — scope, stakeholders, rollback plan | ⬚ | ~60 min |
| 03 | Executing a drill — step-by-step runbook | ⬚ | ~65 min |
| 04 | Recording evidence — what auditors actually want | ⬚ | ~55 min |
| 05 | RTA vs declared RTO — measuring and closing the gap | ⬚ | ~50 min |
| 06 | Drill review — post-drill retrospective template | ⬚ | ~45 min |

## Chapter 04: Alert & Monitoring [⬚] (~6 hours)

| # | Lesson | Status | Time |
|---|--------|--------|------|
| 01 | What to monitor — lag, connectivity, agent health, data integrity | ⬚ | ~60 min |
| 02 | Thresholds vs burn-rate alerting — OpenSLO model for DR | ⬚ | ~65 min |
| 03 | Alert fatigue — signal vs noise in replication monitoring | ⬚ | ~50 min |
| 04 | On-call runbooks — what fires when an alert lands | ⬚ | ~55 min |
| 05 | Dashboard design — what to show the ops team vs the CIO | ⬚ | ~50 min |

## Chapter 05: Cloud DR Patterns [⬚] (~7 hours)

| # | Lesson | Status | Time |
|---|--------|--------|------|
| 01 | AWS DR patterns — multi-region, cross-account | ⬚ | ~65 min |
| 02 | GCP DR patterns — cross-region, Assured Workloads | ⬚ | ~60 min |
| 03 | Azure DR patterns — paired regions, availability zones | ⬚ | ~60 min |
| 04 | Multi-cloud DR — when primary and DR are different providers | ⬚ | ~70 min |
| 05 | Hybrid DR — cloud DR for on-prem workloads | ⬚ | ~65 min |
| 06 | Config drift — keeping primary and DR in sync | ⬚ | ~50 min |

## Chapter 06: Compliance Evidence [⬚] (~8 hours)

| # | Lesson | Status | Time |
|---|--------|--------|------|
| 01 | SAMA BCM requirements — what the controls actually require | ⬚ | ~70 min |
| 02 | NCA ECC-2 DR controls — cloud workload mapping | ⬚ | ~65 min |
| 03 | ISO 22301 — evidence pack for cloud DR | ⬚ | ~75 min |
| 04 | DORA ICT resilience — multi-cloud financial services | ⬚ | ~70 min |
| 05 | RBI/SEBI DR requirements — India context | ⬚ | ~60 min |
| 06 | Generating audit evidence — what "proof of DR" looks like | ⬚ | ~60 min |

## Chapter 07: Incident Response [⬚] (~5.5 hours)

| # | Lesson | Status | Time |
|---|--------|--------|------|
| 01 | First 30 minutes — declaration, comms, initial triage | ⬚ | ~55 min |
| 02 | Failover decision — when to invoke vs wait | ⬚ | ~60 min |
| 03 | Executing failover — human-in-the-loop workflow | ⬚ | ~65 min |
| 04 | Cutover and validation — proving DR site is live | ⬚ | ~50 min |
| 05 | Failback — returning to primary after incident | ⬚ | ~55 min |

## Chapter 08: DR Tooling [⬚] (~5 hours)

| # | Lesson | Status | Time |
|---|--------|--------|------|
| 01 | dr-posture — scanning DR readiness across your estate | ⬚ | ~35 min |
| 02 | rpo-probe — measuring actual replication lag | ⬚ | ~35 min |
| 03 | snapdisk — disk evacuation for non-AWS clouds | ⬚ | ~35 min |
| 04 | backup-audit — finding unprotected resources | ⬚ | ~30 min |
| 05 | dr-drift — config drift between primary and DR | ⬚ | ~35 min |
| 06 | failover-friend — runbook generation from live environment | ⬚ | ~35 min |
| 07 | cdc-watch — CDC pipeline health monitoring | ⬚ | ~30 min |
| 08 | dr-discover — topology scanning and DR posture entry point | ⬚ | ~35 min |
| 09 | cloudcmder — cloud operator TUI for DR operations | ⬚ | ~30 min |
