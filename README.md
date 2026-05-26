# Sample Trajectory Form — 3 wersje

Trzy proste implementacje tego samego formularza (ta sama funkcjonalność, różne technologie).

| Wersja | Folder | Stack |
| --- | --- | --- |
| 1 | `version-1-vanilla/` | HTML + JavaScript + **Tailwind CSS** (CDN) |
| 2 | `version-2-react/` | React 18 + **Tailwind CSS** (CDN) |
| 3 | `version-3-alpine/` | Alpine.js 3 + **Tailwind CSS** (CDN) |

## GitHub Pages

Po publikacji demo jest dostępne pod:

- **Strona główna:** https://skarbona.github.io/sample-trajectory-form/
- [Version 1 — Vanilla](https://skarbona.github.io/sample-trajectory-form/version-1-vanilla/)
- [Version 2 — React](https://skarbona.github.io/sample-trajectory-form/version-2-react/)
- [Version 3 — Alpine](https://skarbona.github.io/sample-trajectory-form/version-3-alpine/)

## Lokalnie

```bash
cd sample-trajectory-form
python3 -m http.server 8080
```

Następnie otwórz `http://localhost:8080`.

## Zachowanie

### Nawigacja

- **Option One** / **Option Two** — przełączanie widoków u góry.

### Option One

- Duży textarea **All Issues** z przykładową treścią.
- Slider **Trajectory Quality** (1–5) na dole.

### Option Two

- Slider **Trajectory Quality** (1–5) na górze.
- Blok **Issue 1** (textarea + select Severity: Low / Medium / Hard).
- Przycisk **Add new Issue** — dodaje kolejne bloki Issue 2, Issue 3, …
