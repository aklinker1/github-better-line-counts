#!/bin/bash
set -e

# Setup and Requirements

function heading() {
    echo -e "\n\x1b[36m\x1b[1m$1\x1b[0m\n"
}

function require_tool() {
    echo "Ensuring $1 is installed..."
    if ! command -v "$1" &> /dev/null ; then
        echo "$1 could not be found"
        exit 1
    fi
}
require_tool "pnpm"
require_tool "gh"
require_tool "jq"

# Generate Changlog

heading "Generate Changelog"
CHANGES=$(pnpm generate-changelog)
SKIPPED=$(echo "$CHANGES" | jq -r '.skipped')
echo "Next version: $NEXT_VERSION"
# if [[ "$SKIPPED" == "true" ]]; then
#     echo "No changes"
#     exit
# fi

CHANGELOG=$(echo "$CHANGES" | jq -r '.changelog')
NEXT_TAG=$(echo "$CHANGES" | jq -r '.nextTag')         # Includes v (ex: v1.2.1)
NEXT_VERSION=$(echo "$CHANGES" | jq -r '.nextVersion') # Excludes v (ex: 1.2.1)
echo "Changelog: $CHANGELOG"
echo "Next tag: $NEXT_TAG"

# Bump Version

heading "Bump version"
cat <<< $(jq ".version=\"$NEXT_VERSION\"" package.json) > package.json

# Checks

heading "Run Checks"
pnpm build
pnpm build:firefox
pnpm test run
pnpm compile

# Commit Changes

heading "Commit Changes"
git add package.json
# git commit -m "chore(release): $NEXT_TAG"
# git tag "$NEXT_TAG"

# Zip everything up

heading "Zip"
pnpm zip
pnpm zip:firefox
pnpm zip:sources

CHROME_ZIP="artifacts/github-better-diffs-$NEXT_TAG-chrome.zip"
FIREFOX_ZIP="artifacts/github-better-diffs-$NEXT_TAG-firefox.zip"
SOURCES_ZIP="artifacts/github-better-diffs-$NEXT_TAG-sources.zip"

# Publish

heading "Publishing to Stores"
pnpm publish-extension --dry-run \
    --chrome-zip "$CHROME_ZIP" \
    --firefox-zip "$FIREFOX_ZIP" \
    --firefox-sources-zip "$SOURCES_ZIP"

# Create Release

heading "Create GitHub Release"
# git push
# git push --tags
# gh release create "$NEXT_TAG" "$CHROME_ZIP" "$FIREFOX_ZIP" "$SOURCES_ZIP" --notes "$CHANGELOG"
echo "gh release create '$NEXT_TAG' '$CHROME_ZIP' '$FIREFOX_ZIP' '$SOURCES_ZIP' --notes '$CHANGELOG'"
