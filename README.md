# val-birthday

Celebrate Val's birthday.

Content:

- [val-birthday](#val-birthday)
  - [Install](#install)
    - [One-time setup](#one-time-setup)
      - [DB](#db)
      - [Quotes API key](#quotes-api-key)
  - [Run](#run)
  - [Test](#test)
  - [Build](#build)
  - [Tech](#tech)
    - [Options considered](#options-considered)

## Install

```sh
npm install
```

### One-time setup

You should end up with an `.env` file (similar to `.env-sample`):

#### DB

Set up [vercel kv](https://vercel.com/docs/storage/vercel-kv/quickstart), eg:

```sh
vercel link
vercel env pull .env.development.local
# rename to work around some issue with the no-config kv setup
mv .env.development.local .env
```

#### Quotes API key

Optionally sign up to [api-ninjas](https://api-ninjas.com/) and set API key in .env to get quotes when generating knowledge:

```env
API_NINJAS_KEY="<your-api-key>"
```

## Run

```sh
# start dev server and open app in browser
npm run dev -- --open
```

## Test

```sh
# unit & integration tests
npm test
```

## Build

Prod version:

```sh
npm run build
```

Preview the production build: `npm run preview`.

## Tech

- web - a tool that supports SSR + progressive enhancement and SPA: [svelte-kit](https://kit.svelte.dev/).
- DB - a key-value store with a reasonable free tier: [vercel-kv](https://vercel.com/storage/kv).
- hosting - a cloud service with a reasonable free tier: [vercel](https://vercel.com/).

### Options considered

- lang:
  - ts
  - alternatives:
    - rust
      - <https://kerkour.com/rust-functional-programming>
      - <https://www.rust-lang.org/learn/get-started>
- web:
  - svelte
    - sveltekit
  - alternatives:
    - solidjs
      - with Astro as Static-Site Generation (SSG)?
    - vue
      - options - ref <https://vuejs.org/guide/extras/ways-of-using-vue.html>:
        - ? Standalone Script - <https://github.com/vuejs/petite-vue>
        - ? Fullstack / SSR - <https://nuxt.com/>
    - feathers
    - <https://www.phoenixframework.org/>
    - <https://nextjs.org/>
      - on top of react
  - doc
    - <https://survey.stackoverflow.co/2023/#section-admired-and-desired-web-frameworks-and-technologies>
    - <https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/>
- hosting:
  - vercel free - <https://vercel.com/templates/svelte/sveltekit-boilerplate>
- DB:
  - <https://vercel.com/storage/kv>
    - <https://vercel.com/docs/storage/vercel-kv/quickstart>
    - <https://vercel.com/templates/svelte/kv-redis-sveltekit>
