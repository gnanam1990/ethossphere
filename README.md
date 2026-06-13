# EthosSphere

> A reputation-based Web3 ecosystem where on-chain Ethos scores drive benefits, penalties, and recovery pathways.

## Overview

EthosSphere is a monorepo for a reputation platform built around an on-chain registry of user reputation profiles. A Solidity registry contract stores per-address scores and tiers, a TypeScript SDK and Express API expose access to that data, and a Next.js dashboard visualizes scores, benefits, and activity. The product is specified in detail in the documents under `docs/`; the code in this repo is an early scaffold of that vision (see [Status](#status)).

## Features

- On-chain reputation registry (`EthosSphereRegistry`) with per-address profiles: ethos score, benefit tier, penalty level, and recovery stage.
- Owner-controlled authorization: only the owner can grant or revoke score-updater accounts, and only authorized accounts can mutate scores, preventing score forgery.
- Ownership transfer and event emission (`ScoreUpdated`, `AuthorizationChanged`, `OwnershipTransferred`).
- Contract test suite covering authorization, score updates, forgery rejection, and ownership transfer.
- HTTP API service (Express) exposing health endpoints.
- TypeScript SDK client for talking to the API.
- Shared TypeScript types (`UserProfile`, `Address`) consumed across packages.
- Web dashboard UI (Next.js + Tailwind) with score display, benefits, transactions, profile, and settings views. The dashboard currently renders mock data (see [Status](#status)).

## Tech stack

- **Monorepo**: pnpm workspaces, Turborepo
- **Web**: Next.js 16, React 19, Tailwind CSS 4, Radix UI, Recharts, lucide-react
- **API**: Express 4, CORS, Morgan, Zod
- **SDK / shared**: TypeScript
- **Contracts**: Solidity 0.8.24, Hardhat, TypeChain, Chai/Ethers tests
- **Tooling**: ESLint 9, Prettier, TypeScript 5
- **Infra (local)**: Docker Compose (PostgreSQL, Redis)

## Architecture

| Path | Description |
| --- | --- |
| `apps/web` | Next.js dashboard (App Router) rendering reputation, benefits, and activity views. |
| `apps/api` | Express HTTP API service. |
| `packages/sdk` | `@ethossphere/sdk` — client for the API, depends on `shared`. |
| `packages/shared` | `@ethossphere/shared` — shared TypeScript types. |
| `contracts` | Hardhat project with the `EthosSphereRegistry` Solidity contract and tests. |
| `infra` | Local Docker Compose stack (PostgreSQL, Redis). |
| `docs` | Product requirements documents (PRD, Frontend PRD). |

## Getting started

### Prerequisites

- Node.js >= 20
- pnpm 9 (the repo pins `pnpm@9.15.9` via `packageManager`)
- Docker (optional, for the local Postgres/Redis stack)

### Installation

```bash
pnpm install
```

### Configuration

The repo does not ship a `.env.example`. The only environment variable read by application code:

| Variable | Used by | Purpose | Default |
| --- | --- | --- | --- |
| `PORT` | `apps/api` | Port the API server listens on | `4000` |

The local Docker Compose stack in `infra/docker-compose.yml` defines its own credentials for PostgreSQL and Redis; the app code does not yet connect to them.

### Running

From the repo root (Turborepo orchestrates all workspaces):

```bash
pnpm dev      # run dev tasks across packages
pnpm build    # build all packages
pnpm lint     # lint all packages
pnpm format   # format with Prettier
```

Per-app commands:

```bash
# Web dashboard (http://localhost:3000)
pnpm --filter web dev

# API server (http://localhost:4000)
pnpm --filter @ethossphere/api dev

# Contracts
pnpm --filter @ethossphere/contracts build   # hardhat compile
pnpm --filter @ethossphere/contracts test    # hardhat test
```

Optional local services:

```bash
docker compose -f infra/docker-compose.yml up -d
```

## Usage

The SDK wraps the API:

```ts
import { EthosSphereClient } from '@ethossphere/sdk';

const client = new EthosSphereClient({ baseUrl: 'http://localhost:4000' });

const status = await client.health();
// { ok: true, service: 'api', ts: '...' }
```

API endpoints currently available:

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | Service info and endpoint list |
| GET | `/health` | Health check |

Note: `EthosSphereClient.getUserProfile()` is a placeholder and throws `Not implemented`.

## Testing

The contracts package has a Hardhat/Chai test suite:

```bash
pnpm --filter @ethossphere/contracts test
```

It covers deployer ownership/authorization, authorized score updates, rejection of updates from unauthorized callers, granting/revoking authorization, and ownership transfer. The other packages do not yet have tests.

## Project structure

```
.
├── apps/
│   ├── api/         # Express API service
│   └── web/         # Next.js dashboard
├── packages/
│   ├── sdk/         # API client (@ethossphere/sdk)
│   └── shared/      # Shared TypeScript types
├── contracts/       # Hardhat + Solidity registry
├── infra/           # Docker Compose (Postgres, Redis)
├── docs/            # Product requirements documents
├── pnpm-workspace.yaml
└── turbo.json
```

## Status

Early scaffold / work in progress. What is real today:

- **Contracts**: `EthosSphereRegistry` is implemented with authorization controls and a passing test suite. Not deployed to any network in this repo.
- **API**: serves health/info endpoints only; reputation endpoints are not yet implemented.
- **SDK**: `health()` works; `getUserProfile()` is a stub that throws `Not implemented`.
- **Web**: the dashboard renders **mock data** and is not yet wired to the API or contract.
- **Infra**: the Postgres/Redis Compose stack is provided for local development but is not yet integrated with the app code.

The full intended product is described in `docs/EthosSphere-PRD.md` and `docs/EthosSphere-Frontend-PRD.md`.

## License

The contract source declares `SPDX-License-Identifier: MIT`. No top-level `LICENSE` file is present in the repository.
