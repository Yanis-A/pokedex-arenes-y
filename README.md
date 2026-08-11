# ReactDex

![logoV2](https://github.com/Yanis-A/reactdex/assets/96735435/f6fbda3e-6cb0-428c-b99b-d2b81b9b59ed)

Pokédex web app built with [React](https://react.dev/), [Vite](https://vitejs.dev/) and the [PokéAPI](https://pokeapi.co/).
Lets you browse the first 1010 Pokémon, search by name, view full stats / species data / evolution chains, and curate a persistent team stored in `localStorage`.

## Stack

- React 18 + Vite 4
- Redux Toolkit (state) + React-Redux
- React Router 6
- Bootstrap 5 + FontAwesome
- Hosting: Firebase Hosting

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5173`.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint over `js`/`jsx` files |
| `npm run deploy` | `npm run build` then `firebase deploy --only hosting` |

## Project structure

```
src/
  assets/           static images & gifs
  components/       reusable UI (Card, Navigation, StatBar, …)
  router/           React Router configuration
  service/          API client, Redux slice/store, utils, localStorage key
  styles/           CSS modules (type colors, Pokemon page layout)
  views/            page-level components (List, Pokedex, Pokemon, NotFound, NoPokemon)
App.jsx             root layout (Navigation + AppRoutes)
main.jsx            entry point (Provider + BrowserRouter)
```

## Firebase hosting

Config lives at the root of the project (`firebase.json`, `.firebaserc`) and points to `dist/` — the Vite build output. The previous setup kept these files in the parent folder and required a manual copy of the build output; that is no longer the case.

To deploy:

```bash
npm run deploy
```

You'll need the Firebase CLI installed (`npm i -g firebase-tools`) and to be logged in (`firebase login`). The default project is `reactdex-3e301` (see `.firebaserc`); within it, `npm run deploy` publishes the build to the hosting site `thereactdex` (see `firebase.json`).

## Views

Home

![image](https://github.com/Yanis-A/pokedex-arenes-y/assets/96735435/cb29c2e4-b9d7-43f4-be17-273fd0046b46)

Pokedex

![image](https://github.com/Yanis-A/pokedex-arenes-y/assets/96735435/4ec3f233-e861-4a2e-bbd1-f54ae9b8521a)

Dynamic search

![image](https://github.com/Yanis-A/pokedex-arenes-y/assets/96735435/da34e4aa-1a3f-40f3-907d-f1fc06e425d6)

Pokemon details

![image](https://github.com/Yanis-A/pokedex-arenes-y/assets/96735435/682de978-2f23-45f8-966a-4b152a2730fa)
![image](https://github.com/Yanis-A/pokedex-arenes-y/assets/96735435/e209f02f-adc8-4166-883b-efe448d702dc)
