# QODIQA

**Deterministic Runtime Consent Enforcement for Artificial Intelligence Systems**

---

QODIQA enforces consent at execution.
Every time.
Without exception.

Not in policy.
Not in documentation.
At runtime.

QODIQA is a deterministic runtime consent enforcement standard for AI systems.
It operates at the inference boundary.
Consent becomes a precondition to execution.
Not a declaration.
Execution without consent does not occur.

---

This is not a compliance layer.
It is an execution constraint.

---

## Start Here

- [Read Whitepaper](https://qodiqa.github.io/qodiqa/whitepaper.html)
- [Explore Core Standard](https://qodiqa.github.io/qodiqa/core-standard.html)
- [Browse Full Corpus](https://qodiqa.github.io/qodiqa/index.html)

---

## What is QODIQA

QODIQA defines a runtime enforcement layer positioned at the AI inference boundary. Before any execution proceeds, consent conditions are evaluated deterministically against a verified execution context. If consent cannot be confirmed, execution is halted.

Enforcement is structural, not advisory.

The standard specifies the enforcement interface, cryptographic verification model, audit record format, failure handling requirements, and certification criteria for compliant deployments. It does not define policy.
It enforces it.

---

## Problem

AI governance frameworks define consent requirements. They do not enforce them.

Consent exists in policy documents, data agreements, and system specifications. At runtime, these conditions are assumed — not verified. Systems invoke models, process data, and return outputs without mechanically confirming that consent conditions are satisfied.

The gap between policy and execution is structural. It cannot be closed by documentation, audits after the fact, or organizational controls alone.

Policy without runtime enforcement is not enforcement.
It is assumption.
Not enforcement.

---

## Solution

- **Deterministic runtime enforcement** — Consent conditions are evaluated on every inference call. Without exception.
- **Fail-closed execution** — Unverifiable or absent consent halts execution. There is no permissive fallback.
- **Cryptographic verification** — Consent signals are cryptographically bound to execution context. Tampering is detectable.
- **Auditability** — Every enforcement decision produces a signed, structured audit record suitable for regulatory review.

---

## Repository Structure

```
/index.html
/docs/
/assets/
README.md
LICENSE
```

---

## Standard Corpus

The following documents constitute the normative and informative QODIQA corpus. All documents are versioned under the QODIQA Governance Charter.

1. QODIQA__68-Point_Enforcement_Framework_for_Deterministic_Runtime_Consent_Enforcement
2. QODIQA__Audit_and_Evidence_Generation_Model
3. QODIQA__Audit_Readiness_and_Evidence_Pack
4. QODIQA__Certification_Framework_for_Deterministic_Runtime_Consent_Enforcement
5. QODIQA__Conformance_Test_Suite_Specification_for_Deterministic_Runtime_Consent_Enforcement
6. QODIQA__Conformance_Verification_Specification
7. QODIQA__Consent_as_Infrastructure_for_Artificial_Intelligence_Technical_Whitepaper
8. QODIQA__Core_Standard_for_Deterministic_Runtime_Consent_Enforcement
9. QODIQA__Corpus_Change_Log_and_Version_History
10. QODIQA__Economic_Impact_Analysis_of_Deterministic_Runtime_Consent_Enforcement
11. QODIQA__Executive_Brief_for_Deterministic_Runtime_Consent_Enforcement
12. QODIQA__Extended_Adversarial_Threat_Model
13. QODIQA__Failure_Handling_and_Recovery_Specification
14. QODIQA__Global_Enforcement_Invariants_for_Deterministic_Runtime_Consent_Enforcement
15. QODIQA__Governance_Charter_for_the_QODIQA_Standard_Corpus
16. QODIQA__Implementation_Conformance_Checklist
17. QODIQA__Implementation_Playbook_for_Deterministic_Runtime_Consent_Enforcement
18. QODIQA__Interoperability_and_Deployment_Constraints
19. QODIQA__Master_Index_and_Readers_Guide
20. QODIQA__Non-Compliance_Conditions_and_Failure_Modes
21. QODIQA__Positioning_and_Scope_Limitation_Statement
22. QODIQA__Public_Specification_License
23. QODIQA__Reference_Architecture_for_Deterministic_Runtime_Consent_Enforcement
24. QODIQA__Reference_Implementation_Specification_-_Minimal_Deterministic_Enforcement_Stack
25. QODIQA__Regulatory_Alignment_Matrix_for_Deterministic_Runtime_Consent_Enforcement
26. QODIQA__Residual_Risk_and_Assumption_Disclosure_Annex
27. QODIQA__Security_and_Cryptographic_Profile_for_Runtime_Consent_Enforcement
28. QODIQA__System_Boundary_and_Trust_Model_Specification
29. QODIQA__Terminology_and_Normative_Definitions
30. QODIQA__Threat_Model_and_Abuse_Case_Specification
31. QODIQA__Use_Case_Dossiers_for_Runtime_Consent_Enforcement_Deployments
32. QODIQA__Worked_Example_End_to_End_Scenario

---

## Design Principles

| Principle | Definition |
|---|---|
| Deterministic enforcement | Consent evaluation yields a binary, reproducible outcome on every execution. No probabilistic fallback. |
| Runtime interception | Enforcement is applied at the inference boundary, before any output is generated or any downstream action is taken. |
| Fail-closed execution | If consent cannot be verified, execution halts. The system does not degrade to permissive operation. |
| Cryptographic auditability | Each enforcement decision is cryptographically signed and independently verifiable outside the enforcing system. |
| Scope-bounded consent | Consent is evaluated against a defined execution scope. Operations outside that scope are blocked regardless of other conditions. |

---

## Status

**Public specification.**
The QODIQA standard corpus is released for implementation, regulatory reference, and independent review.

**Reference implementation:** In progress.
Specification available in corpus document 24.

---

## License

QODIQA Public Specification License.
See [LICENSE](./LICENSE) and corpus document 22 for full terms.
