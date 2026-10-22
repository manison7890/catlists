import { createRequire } from "node:module";
import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatEthersChaiMatchers from "@nomicfoundation/hardhat-ethers-chai-matchers";
import hardhatMocha from "@nomicfoundation/hardhat-mocha";

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [hardhatEthers, hardhatEthersChaiMatchers, hardhatMocha],
  solidity: {
    version: "0.8.37",
    path: require.resolve("solc/soljson.js"),
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  },
  paths: {
    sources: "./contracts",
    tests: { mocha: "./test/contract" },
    cache: "./cache_hardhat",
    artifacts: "./artifacts_hardhat"
  }
});
