# Dust Collector

Dust Collector is a web application that helps users collect, batch process, and aggregate small cryptocurrency balances ("dust") from multiple wallets and chains. By leveraging Base's low-fee environment, the app makes it practical to reclaim and use small token amounts that would otherwise be lost due to high transaction fees.

## Features

- **Cross-Chain Dust Collection:** Aggregate small balances from different wallets and chains.
- **Batch Processing:** Batch transactions to minimize gas fees.
- **Base Network Aggregation:** Move dust to Base for efficient management.
- **Modern UI:** Built with Next.js, Tailwind CSS, and shadcn/ui components.
- **Wallet Integration:** Connect and manage multiple wallets.
- **Charts & Analytics:** Visualize dust distribution and transaction history.
- **Theme Support:** Light and dark themes.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [RainbowKit](https://www.rainbowkit.com/) (wallet connection)
- [Recharts](https://recharts.org/) (charts)
- [Base](https://base.org/) (blockchain network)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/WambuiGrace/collector.git
   cd dust-collector
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file if needed for API keys or contract addresses.

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dust-collector/
├── app/                # Next.js app directory (pages, layout, etc.)
├── components/         # Reusable React components
├── hooks/              # Custom React hooks
├── lib/                # Utilities, contract ABIs, helpers
├── public/             # Static assets
├── styles/             # Global and component styles
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── ...
```

## Smart Contract Integration

The app interacts with a `DustCollector` smart contract, supporting:
- `getUserBalance(user, token)`
- `depositDust(token, amount)`
- `batchDeposit(tokens, amounts)`
- `withdrawAsEth(tokens)`
- `donateAll(tokens)`

See [`lib/abis/dustcollector.ts`](lib/abis/dustcollector.ts) for the ABI.

## About Dust

> **Dust** refers to tiny amounts of cryptocurrency that are too small to be transacted due to network fees exceeding their value. Dust Collector helps you reclaim value from these otherwise unusable assets by batching them together and moving them to Base's low-fee environment.

## License

MIT

---

*Built for hackathons and open-source blockchain projects.*




