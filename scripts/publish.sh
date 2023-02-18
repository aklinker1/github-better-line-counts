#!/bin/bash
pnpm build
pnpm build:firefox

pnpm zip
pnpm zip:firefox
