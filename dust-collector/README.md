### **Overview of the Project**
This is a **Cross-Chain Dust Collector** application designed to help users collect and manage small, unusable cryptocurrency balances (dust) across multiple wallets and blockchains. The app aggregates these balances, batches transactions to reduce gas fees, and transfers them to a low-fee environment like Base.

---

### **Project Structure**
The project is built using Next.js for the frontend, with Tailwind CSS for styling and Radix UI for accessible components. Here's a high-level breakdown of the structure:

1. **Frontend**:
   - **Pages**: Next.js pages for routing (`/pages` directory).
   - **Components**: Reusable UI components like buttons, sliders, dialogs, and charts.
   - **State Management**: React hooks and context for managing global state (e.g., wallet connections, user progress).
   - **Styling**: Tailwind CSS for utility-first styling.

2. **Core Features**:
   - **Wallet Connection**: Integrates with wallets like MetaMask or Solana.
   - **Dust Collection**: Identifies small balances across wallets and tokens.
   - **Batch Processing**: Optimizes transactions to minimize gas fees.
   - **Achievements**: Tracks user progress and displays badges for completed tasks.
   - **Charts**: Uses Recharts to visualize wallet balances and transaction history.

3. **Cross-Chain Support**:
   - Handles operations across multiple blockchains.
   - Includes logic for aggregating balances and transferring them to Base.

---

### **Key Files and Directories**

1. **`/pages`**:
   - Contains the main routes of the app (e.g., `index.js` for the dashboard, `api` for backend API routes).
   - Example: `pages/index.js` is the entry point for the dashboard.

2. **components**:
   - Houses reusable UI components like `Button`, `Slider`, `Dialog`, and `WalletConnect`.
   - Example: `components/WalletConnect.js` handles wallet integration.

3. **styles**:
   - Tailwind CSS configuration and global styles.

4. **`/utils`**:
   - Utility functions for handling blockchain interactions, formatting, and API calls.
   - Example: `utils/formatBalance.js` formats wallet balances for display.

5. **`/context`**:
   - Context providers for global state management (e.g., wallet connection, theme switching).
   - Example: `context/WalletContext.js` manages wallet-related state.

6. **hooks**:
   - Custom React hooks for reusable logic.
   - Example: `hooks/useWallet.js` abstracts wallet connection logic.

7. **public**:
   - Static assets like images, icons, and fonts.

---

### **How It Works**
1. **Wallet Connection**:
   - Users connect their wallets via the `WalletConnect` component.
   - The app fetches wallet balances and identifies dust.

2. **Dust Collection**:
   - The app aggregates small balances across tokens and wallets.
   - Users can batch-process these balances to minimize gas fees.

3. **Achievements**:
   - Tracks user actions e.g. staking.

4. **Cross-Chain Operations**:
   - Handles transactions across multiple blockchains.
   - Transfers aggregated balances to Base for lower fees.

---

### **What You Need to Know to Make Changes**
1. **React and Next.js**:
   - Understand the Next.js routing system (`/pages` directory).
   - Familiarity with React hooks and context for state management.

2. **Blockchain Integration**:
   - The app interacts with wallets and blockchains. You’ll need to understand how wallet providers (e.g., MetaMask) work.
   - Look into the `utils` directory for blockchain-related logic.

3. **Styling**:
   - Tailwind CSS is used for styling. If you’re adding or modifying components, you’ll likely need to work with Tailwind classes.

4. **Charts**:
   - Recharts is used for data visualization. If you’re modifying charts, check the components directory for chart-related components.

5. **API Calls**:
   - Backend API routes are in the `pages/api` directory. If you’re adding new functionality that requires server-side logic, you’ll work here.


### **Development Setup**
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd dust-collector
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Test wallet connections and blockchain interactions using a testnet.
