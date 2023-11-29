# val-birthday

Celebrate Val's birthday.

Content:

- [val-birthday](#val-birthday)
  - [Install](#install)
    - [One-time setup](#one-time-setup)
  - [Run](#run)
  - [Test](#test)
  - [Build](#build)
  - [Tech](#tech)

## Install

```sh
npm i
```

### One-time setup

Set up [vercel kv](https://vercel.com/storage/kv), you should end up with a file like `.env.development.local` (similar to `.env-sample`). Rename it to `.env` (to work around some issue with the no-config kv setup).

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
