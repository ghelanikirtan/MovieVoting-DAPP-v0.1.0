import "./App.css";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./Constants/constants";

import MovieList from "./MovieList";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Connect to the contract on component mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      await connectToContract();
    }
  };

  const connectToContract = async () => {
    try {
      // await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0x58165D1783594a1683741330A4F58d9248d77d1A";
      const contractAbi = abi;

      const movieContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      setContract(movieContract);
      setAccount(await signer.getAddress());
      setIsWalletConnected(true);
    } catch (error) {
      console.error("Failed to connect to the contract", error);
    }
  };

  // const requestAccount = async () => {
  //   await window.ethereum.request({ method: "eth_requestAccounts" });
  // };
  
  const connectWallet = async () => {
    try {
      // await window.ethereum.request({ method: "eth_requestAccounts" });
      await window.ethereum.enable();
      await connectToContract();
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  // API fetch all movie list for validation here and call it on handleAddMovie function

  // Adding movie to the list by anyone as of now
  const handleAddMovie = async () => {
    try {
      await contract.addMovie(movieTitle);
      setMovieTitle("");
    } catch (error) {
      console.error("Unable to add movie", error);
    }
  };

  return (
    <>
    <div className="App">
      <h1>MOVIE VOTING <span>DAPP</span></h1>

      {/* {account && <p>Connected Account: {account}</p>} */}
      {
        <div>
          <input
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            placeholder="Enter movie title here..."
            />
          <button className="add-btn" onClick={handleAddMovie}>Add Movie</button>

        </div>
      }
      {!isWalletConnected && (
        <button onClick={connectWallet}>Connect Wallet</button>
        )}


    </div>
    <MovieList contract={contract} />
        </>
  );
}

export default App;
