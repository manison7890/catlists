# Catlists ICO Crowdfunding Website

An Angular + Express + MongoDB project for the Catlists Token (CTL) project.
The current release is a responsive informational site and non-transactional
testnet preview. It does not accept contributions or claim tokens.

## Run locally

Requirements: Node.js 22.22.3+ (or Node.js 24.15+) and npm.

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Set private `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a random `JWT_SECRET` of at
   least 32 characters before testing the admin workspace.
4. Optionally set `MONGODB_URI` to a local MongoDB instance.
5. Run `npm run dev`.
6. Open `http://localhost:4200`; the API runs at `http://localhost:4000`.

Without MongoDB, the public website and sample config run in demo-memory mode.
Database-backed planning data requires MongoDB. Never put real investor
records, wallet secrets, or private credentials in the repository.

## Included

- Responsive Catlists-branded landing page using the supplied logo.
- Project overview, tokenomics, sale-round preview, roadmap, proposed vesting,
  FAQ, and contact sections.
- MetaMask/EIP-1193 wallet connection and Sepolia chain detection. The page only
  requests wallet connection; it does not request signatures or transfers.
- Investor dashboard preview. Purchase and vesting figures remain empty/demo
  until a deployed contract and event indexer are connected.
- Express API with health/config/dashboard endpoints.
- Mongoose models for round planning and indexed purchase records.
- Single-admin sign-in, round-planning CRUD, overview statistics, and CSV
  report route. Admin credentials and JWT secret are supplied only through
  environment variables.
- Solidity sale contract at `contracts/CatlistsICO.sol`, with the root
  `CatlistsICO.sol` kept as a compatibility import. Claims use OpenZeppelin
  `SafeERC20` transfer handling.

## Contract starter

`contracts/CatlistsICO.sol` contains a fixed 3,000,000 CTL ERC-20, four
sequential sale rounds, ETH/USDT payment paths, Chainlink USD feeds,
owner-controlled pause and proceeds withdrawal, and the requested
TGE-plus-12-month vesting claim schedule. Sale windows must be sequential and
non-overlapping, and round setup is locked once the one-time TGE is set after
all four rounds. It imports OpenZeppelin Contracts v5.x. Hardhat 3 compiles it
against pinned local Solidity 0.8.37. The 14 contract tests cover purchase
pricing, oracle freshness and validation, allocation and sale boundaries,
round advancement, TGE, vesting, and sale-inventory protections.

## Sale safety status

The ICO contract has **not been deployed**. Sale transactions are intentionally
disabled in the frontend and API. No contract address, testnet oracle feed,
USDT deployment, public-sale price, sale allocations, or launch schedule has
been confirmed. The displayed first three prices and 30-day duration are
planning values from the client questionnaire, not a live offer.

The contract currently assumes sale prices are USDT per CTL and USDT has 6
decimals. Those assumptions, all sale allocations, token inventory, Chainlink feeds,
round timing, and TGE must be verified for the exact target network. The
contract is a development starter and has not undergone independent security
or legal review. Do not deploy to mainnet or accept real funds before
comprehensive contract testing, independent audit, and legal/compliance review.

`npm audit` currently reports no known dependency advisories. Re-run the audit
when dependencies change. This does not replace independent contract, legal,
or production-operations reviews.

Staking was requested as a future phase and is not implemented.

## API

- `GET /api/health`
- `GET /api/config`
- `GET /api/dashboard/:wallet`
- `POST /api/admin/login`
- Protected `GET /api/admin/overview`
- Protected `GET /api/admin/rounds`
- Protected `PUT /api/admin/rounds/:round`
- Protected `GET /api/admin/purchases`
- Protected `GET /api/admin/report.csv`

The CSV and statistics depend on a MongoDB-backed transaction event index.
Blockchain event ingestion is not included in this prototype; without it the
report is an empty schema and statistics are zero.

## Project notes

The client-facing visual copy and supplied whitepaper are draft content and
require project-owner review. The whitepaper is available as a browsable web
page at `src/assets/whitepaper/index.html`, linked from the Resources section
and footer. Team, official contact/community links, and launch dates were not
provided, so the page marks them as pending instead of inventing details. The
five-day proposal mapping and remaining scope are recorded in
[`docs/DELIVERY-ROADMAP.md`](./docs/DELIVERY-ROADMAP.md).

The app uses Angular 22. Re-run `npm audit` when dependencies change. A clean
dependency audit is necessary but not sufficient for production security; the
full platform still requires independent review.

## Commands

- `npm run dev` — Angular and Express development servers.
- `npm run build` — optimized Angular production build.
- `npm run check` — Node syntax checks.
- `npm test` — API and Solidity contract tests.
- `npm run test:api` — API tests only.
- `npm run test:contract` — Hardhat contract tests only.
- `npm run contract:compile` — compile Solidity using the pinned local compiler.
- `npm start` — Express API; serves the Angular build when `NODE_ENV=production`.

## Client inputs still required

- Final token allocation by sale round and overall distribution.
- Public-sale price; the questionnaire only gave the first three prices.
- Confirm whether the listed prices are denominated in USDT per CTL.
- Exact testnet launch dates, TGE date, and legal/compliance copy.
- Verified Sepolia USDT and Chainlink feed addresses and deployed contract
  addresses.
- Project-owner approval of the draft whitepaper, plus team, contact, and
  official community links.
