![Github: Better Line Counts](./.github/assets/screenshot.png)

[<img height="72" src="./.github/assets/promo-cws.svg" alt="Available in the Chrome Web Store">](https://chrome.google.com/webstore/detail/ocfdgncpifmegplaglcnglhioflaimkd) [<img height="72" src="./.github/assets/promo-fas.svg" alt="Available in the Firefox Addon Store">](https://addons.mozilla.org/en-US/firefox/addon/github-better-line-counts/)

A chrome extension that removes generated files from a PR's line count.

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

### Scripts

This extension is bundled via `vite-plugin-web-extension`.

- `pnpm dev`: Launchs Chrome with the dev version of the extension installed.
- `pnpm build`: Builds the extension for production. Outputs to the `dist` directory.
- `pnpm zip`: Zips up the `dist` directory into an installable ZIP file.

Add `:firefox` suffix to some commands to target firefox instead of Chrome.

- `pnpm build:firefox`
- `pnpm dev:firefox`

### Auto-imports

This extension also uses `unplugin-auto-import` to make some imports available without writing the import statement.

For Typescript to work properly in your editor, `unplugin-auto-import` generates a declaration file at: `src/@types/auto-imports.d.ts`. You must run `pnpm build` to create this file before types will work properly.

### Running Tests

Unit tests are written with Vitest.

```ts
pnpm test
```

## Release an Update

Eventually, I'll create a GitHub action for this. But for now, you can release an update by:

1. Create a file, `.env.submit`, with the following content:

   ```sh
   # Follow: https://developer.chrome.com/docs/webstore/using_webstore_api/
   CHROME_EXTENSION_ID="..."
   CHROME_CLIENT_ID="..."
   CHROME_CLIENT_SECRET="..."
   CHROME_REFRESH_TOKEN="..."

   # Follow: https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-sign
   FIREFOX_EXTENSION_ID="..."
   FIREFOX_JWT_ISSUER="..."
   FIREFOX_JWT_SECRET="..."
   ```

2. _Optional_: Run `pnpm submit:dry` to test if your config is correct.

3. Run `pnpm submit` to submit new versions to the stores.
