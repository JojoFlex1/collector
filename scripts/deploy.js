// scripts/deploy.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const donationAddress = process.env.DONATION_ADDRESS;
  const uniswapRouterAddress = "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24"; 

  if (!donationAddress) {
    throw new Error("❌ DONATION_ADDRESS not found in .env");
  }

  console.log("🚀 Deploying DustCollector contract...");
  console.log("📬 Donation Address:", donationAddress);
  console.log("🔁 Uniswap Router Address:", uniswapRouterAddress);

  const DustCollector = await ethers.getContractFactory("DustCollector");
  const dustCollector = await DustCollector.deploy(donationAddress, uniswapRouterAddress);

  await dustCollector.waitForDeployment();
  console.log("✅ DustCollector deployed to:", await dustCollector.getAddress());
}

main().catch((error) => {
  console.error("💥 Deployment failed:", error);
  process.exit(1);
});
// // scripts/deploy.js
// const { ethers } = require("hardhat");
// require("dotenv").config();

// async function main() {
//   const donationAddress = process.env.DONATION_ADDRESS;
//   // Uniswap V2 Router address on Base
//   const uniswapRouterAddress = "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24"; 
  
//   console.log("Deploying DustCollector contract...");
//   console.log("Donation Address:", donationAddress);
//   console.log("Uniswap Router Address:", uniswapRouterAddress);

//   const DustCollector = await ethers.getContractFactory("DustCollector");
//   const dustCollector = await DustCollector.deploy(donationAddress, uniswapRouterAddress);

//   await dustCollector.deployed();

//   console.log("DustCollector deployed to:", dustCollector.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });