![Github: Better Line Counts](./.github/assets/screenshot.png)

[<img height="72" src="./.github/assets/promo-cws.svg" alt="Available in the Chrome Web Store">](https://chrome.google.com/webstore/detail/ocfdgncpifmegplaglcnglhioflaimkd) [<img height="72" src="./.github/assets/promo-fas.svg" alt="Available in the Firefox Addon Store">](https://addons.mozilla.org/en-US/firefox/addon/github-better-line-counts/)

A chrome extension that removes generated files from GitHub's line counts.

### How does this work?

The extension uses the Github API to load information about your PR then recalculates the diff, subtracting generated files listed in the repo's `.gitattributes` file.

```
pnpm-lock.yaml  linguist-generated
vendor/**/*     linguist-generated
*.gen.html      linguist-generated
```

## Roadmap

- [x] `v1.0.0` Subtract a hardcoded list of generated files from PR diffs as POC
- [x] `v1.1.0` Support private repos via GitHub PAT
- [x] `v1.2.0` Make the list based off your `.gitattributes`
- [x] `v1.3.0` Show the number of generated lines next to additions and subtractions
- [ ] Recalculate the 5 diff boxes next to the count
- [ ] Add a dropdown that lists the files that were counted in the generated line count

That's it. Very simple, targeted extension for fixing 1 problem with GitHub.

## Development

You must use [Bun](https://bun.sh/) with this repo.

Install dependencies:

```sh
bun i
```

### Default GitHub Token

You can provide a default API token for development by creating a `.env.development.local` file:

```sh
VITE_DEFAULT_TOKEN=<your-token>
```

### Scripts

This extension is bundled via [WXT](https://wxt.dev).

- `bun dev`: Launches Chrome with the dev version of the extension installed.
- `bun run build`: Builds the extension for production. Outputs to the `dist` directory.
- `bun run zip`: Zips up the `dist` directory into an installable ZIP file.

Add `:firefox` suffix to some commands to target firefox instead of Chrome.

- `bun run build:firefox`
- `bun run dev:firefox`

### Running Tests

Unit tests are written with Vitest.

```ts
bun run test
```

## Release an Update

Use the [Submit for Review](https://github.com/aklinker1/github-better-line-counts/actions/workflows/submit.yml) workflow.
