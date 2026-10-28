# Security Policy

This repository contains the QODIQA specification corpus (HTML documents and GitHub Pages assets). It contains no executable service code.

## Reporting a vulnerability or a specification flaw

Please report privately. Do not open a public issue for security-sensitive findings.

1. Preferred: use GitHub private vulnerability reporting for this repository (Security tab, "Report a vulnerability").
2. Alternative: email security@qodiqa.com.

Include the document identifier (for example `QODIQA-CORE-2026-001`), the section, and a description of the weakness or ambiguity. We aim to acknowledge reports within 5 business days.

## Scope

- Weaknesses or ambiguities in the specification text that would allow a conforming implementation to violate its stated guarantees.
- Problems with the published site (qodiqa.github.io/qodiqa), such as injected scripts or leaked data.

Implementation code is in separate repositories (`qodiqa-gateway`, `qodiqa-verify`, `qodiqa-anchors`), each with its own security policy.
