# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

ReactDex — a Pokédex single-page app (React 18 + Vite 4) that browses Pokémon from the public [PokéAPI](https://pokeapi.co/api/v2), shows detailed stats/species/evolution/type-matchup data, and lets the user curate a persistent team.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server + HMR on `http://localhost:5173` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint over `js`/`jsx`; `--max-warnings 0`, so any warning fails |
| `npm run deploy` | `npm run build` then `firebase deploy --only hosting` |

There is no test runner configured. Lint is the only automated check — keep it clean (zero warnings) before considering work done.

## Architecture

Data flows **PokéAPI → view-level `useEffect` fetch → local component state → render**. There is no data caching layer or fetch library beyond `axios`; each view refetches on mount/param change.

- **`src/service/service.js`** — the only place that talks to PokéAPI. All network calls (`fetchPokemons`, `fetchPokemonById`, `fetchPokemonSpeciesById`, `fetchPokemonEvolutionChain`, `fetchType`) live here. Add new endpoints here rather than calling `axios` from components.
- **`src/service/globalPropsSlice.js`** — the single Redux slice. Holds only cross-cutting UI state: `search` (current filter text), `team` (array of `{id, name}`), and `lastTeamAction` (drives the toast). Per-page API data is intentionally *not* in Redux — it lives in the fetching component. `togglePokemonInTeam` writes `team` through to `localStorage` on every change (write-through persistence).
- **`src/service/store.js`** — rehydrates `team` from `localStorage` into `preloadedState` at startup. The storage key is the opaque constant in `src/service/localStorage.js` (`STORAGE_NAME`) — reuse that constant, never a literal.
- **`src/router/Routes.jsx`** — routes: `/` (List, the browse grid), `/pokedex` (the team), `/pokemon/:id` (detail), `/nopokemon` (out-of-range id), `*` (NotFound).

### Two cross-page conventions to preserve

1. **Search is URL-driven.** `Navigation.jsx` mirrors the search box into the URL `?q=` param and syncs it back into Redux on list pages, so refresh/back rebuilds the filter. Typing from a non-list page navigates to `/?q=…`. Keep the `?q=` ↔ Redux `search` sync intact when touching search.
2. **ID range is centralized.** `MIN_POKEMON_ID` / `MAX_POKEMON_ID` in `src/service/constants.js` bound every list and the prev/next navigation. Bump `MAX_POKEMON_ID` when a new generation lands on PokéAPI; do not hardcode counts elsewhere.

### Type-driven theming

Pokémon-type colors are the app's visual system and exist in **two parallel sources that must stay in sync**:
- `src/service/utils.js` — `getColorForType(type, opacity)` (inline `rgba` styles) and `getEmojiForType(type)`.
- `src/styles/typeColors.module.css` — CSS-module classes keyed by type name (e.g. `styles[type]`, `styles[\`${firstType}_light\`]`, `styles[\`shadow-${firstType}\`]`).

Components select these classes dynamically by type name, so a new/renamed type must be added to both the util switches and the CSS module.

### Conventions

- **Styling:** Bootstrap 5 utility classes for layout, CSS Modules (`*.module.css`) for the type-color system, `App.css` for globals. Dark mode is Bootstrap's `data-bs-theme` attribute, toggled in `Navigation.jsx` and persisted under `localStorage["reactdex_theme"]`.
- **Prop validation:** components use `prop-types` (there is no TypeScript despite `@types/*` being present).
- **Images:** sprites come from the PokeAPI GitHub raw URLs, built from `id`; every `<img>` has an `onError` fallback to sprite `0.png`. Follow that pattern for new sprite images.

## Deployment note

Firebase config is at the repo root: `.firebaserc` names the Firebase **project** `reactdex-3e301`; `firebase.json` deploys the `dist/` build to the hosting **site `thereactdex`** within that project. (Project ≠ site — a project can host several sites, so these differing names are expected, not a misconfiguration.) SPA rewrites route all paths to `/index.html`.
