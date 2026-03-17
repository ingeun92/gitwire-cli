# GitWire CLI

A command-line interface for accessing GitWire trend data. Built for both developers and AI agents, with first-class `--json` support for machine-readable output.

## Installation

```bash
npm install -g gitwire-cli
```

## Usage

### Trends

View trending GitHub repositories by star growth.

```bash
# Default: 24-hour trends
gitwire trends

# Weekly trends
gitwire trends --window 1w

# Monthly trends in JSON format (for AI agents / pipelines)
gitwire trends --window 1m --json
```

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-w, --window <window>` | Time window: `24h`, `1w`, `1m` | `24h` |
| `--json` | Output raw JSON to stdout | `false` |

### Insights

View investment insights and editorial content.

```bash
# Latest 10 insights
gitwire insights

# Latest 5 insights
gitwire insights --latest 5

# JSON output for pipeline consumption
gitwire insights --latest 20 --json
```

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-l, --latest <number>` | Number of insights to fetch | `10` |
| `--json` | Output raw JSON to stdout | `false` |

## Output Modes

### Human Mode (Default)

Colorized terminal output with tables and formatting:

```
#    Repository                                Language           Stars +    Total Stars
---------------------------------------------------------------------------------------------
1    some-cool-repo                            TypeScript              +150      12000
2    another-repo                              Python                   +98       8500
```

### Agent Mode (`--json`)

Pure JSON to stdout. No colors, no decorations. Designed for piping and parsing:

```bash
gitwire trends --json | jq '.data[0].repository.name'
```

Errors are written to stderr, ensuring clean stdout for parsers.

## Configuration

| Environment Variable | Description | Default |
|---------------------|-------------|---------|
| `GITWIRE_API_URL` | GitWire Core API base URL | `https://gitwire-core.vercel.app` |

## Architecture

```
+--------------+        HTTPS         +---------------+       +----------+
|  gitwire-cli +--------------------->| gitwire-core  +------>| Supabase |
|  (Terminal)  |  /api/v1/trends      | (Vercel API)  |       | (PgSQL)  |
|              |  /api/v1/insights    |               |       +----------+
+--------------+                      +---------------+
      |
      +-- Human mode: Chalk-colored tables
      +-- Agent mode: Raw JSON to stdout
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run locally
node dist/index.js trends --window 24h

# Watch mode
npm run dev
```

## Requirements

- Node.js >= 18

## License

[MIT](LICENSE)
