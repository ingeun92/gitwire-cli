<h1 align="center">GitWire CLI</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/gitwire-cli"><img src="https://img.shields.io/badge/npm-gitwire--cli-CB3837?style=flat-square&logo=npm" alt="npm" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-%3E%3D18-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/--json-Agent%20Ready-00ff88?style=flat-square" alt="Agent Ready" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="MIT License" /></a>
</p>

<p align="center">
  CLI for accessing GitWire trend data.<br/>
  Built for both developers and AI agents, with first-class <code>--json</code> support.
</p>

---

## Install

```bash
# npm
npm install -g gitwire-cli

# pnpm
pnpm add -g gitwire-cli
```

## Quick Start

```bash
# Trending repos (24h)
gitwire trends

# Weekly trends, JSON output for pipelines
gitwire trends -w 1w --json

# Latest investment insights
gitwire insights --latest 5
```

## Commands

### `gitwire trends`

View trending GitHub repositories by star growth.

| Flag | Description | Default |
|------|-------------|---------|
| `-w, --window <window>` | Time window: `24h`, `1w`, `1m` | `24h` |
| `--json` | Output raw JSON to stdout | off |

### `gitwire insights`

View investment insights and editorial content.

| Flag | Description | Default |
|------|-------------|---------|
| `-l, --latest <number>` | Number of insights to fetch | `10` |
| `--json` | Output raw JSON to stdout | off |

## Output Modes

### Human Mode (default)

Colorized terminal output with tables:

```
#    Repository                               Language        Stars +   Total Stars
----------------------------------------------------------------------------------
1    some-cool-repo                           TypeScript          +150       12000
2    another-repo                             Python               +98        8500
```

### Agent Mode (`--json`)

Pure JSON to stdout. No colors. Designed for piping:

```bash
gitwire trends --json | jq '.data[0].repository.name'
gitwire insights --json | jq '.data[].investments'
```

> Errors go to stderr, keeping stdout clean for parsers.

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `GITWIRE_API_URL` | GitWire Core API URL | `https://gitwire-core.vercel.app` |

## Architecture

```
+--------------+        HTTPS         +---------------+       +----------+
|  gitwire-cli +--------------------->| gitwire-core  +------>| Supabase |
|  (Terminal)  |  /api/v1/trends      | (Vercel API)  |       | (PgSQL)  |
|              |  /api/v1/insights    |               |       +----------+
+--------------+                      +---------------+
      |
      +-- Human mode ..... Chalk-colored tables
      +-- Agent mode ..... Raw JSON to stdout
```

## Development

```bash
# npm
npm install          # install dependencies
npm run build        # compile TypeScript
npm run dev          # watch mode

# pnpm
pnpm install         # install dependencies
pnpm build           # compile TypeScript
pnpm dev             # watch mode

node dist/index.js trends --window 24h   # run locally
```

## Related

- [`gitwire-core`](https://github.com/ingeun92/gitwire-core) - Backend API & data pipeline
- [`gitwire-web`](https://github.com/ingeun92/gitwire-web) - Professional data dashboard

## License

[MIT](LICENSE)
