import "./App.css";
import React, { useState, useEffect } from "react";
import { Contract, ethers } from "ethers";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import {
//   EthereumClient,
//   w3mConnectors,
//   w3mProvider,
// } from "@web3modal/ethereum";
// import { Web3Modal } from "@web3modal/react";
// import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { arbitrum, mainnet, polygon } from "viem/chains";
import abi from "./Constants/constants";

import MovieList from "./MovieList";

function App() {
  const [contract, setContract] = useState(null);

  // Connect to the contract on component mount
  useEffect(() => {
    connectToContract();
  }, []);

  const connectToContract = async () => {
    // try{
    // const provider = new ethers.providers.Web3
    // }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    // await window.ethereum.enable();

    const contractAddress = "0x1fDffbbbb648379bdce4Ef1301Ed4Adab3Be3c20";
    const contractAbi = abi;

    const movieContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider.getSigner()
    );

    setContract(movieContract);

    // const signer = provider.getSigner();
  };

  // console.log();

  return (
    <div className="App">
      <h1>Movie Voting</h1>
      {Contract && <MovieList contract={contract} />}
    </div>
  );
}

export default App;
