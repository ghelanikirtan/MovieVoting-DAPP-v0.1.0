import "./App.css";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./Constants/constants";

import MovieList from "./MovieList";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");
  

  // Connect to the contract on component mount
  useEffect(() => {
    connectToContract();
  }, []);

  const connectToContract = async () => {
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0x06298174Fed757B28f043B9473D3414aCC6f37cA";
      const contractAbi = abi;

      const movieContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      setContract(movieContract);
      setAccount(await signer.getAddress());
    } catch (error) {
      console.error("Failed to connect to the contract", error);
    }
  };

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };
  // console.log();

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
    <div className="App">
      <h1>Movie Voting</h1>
      {account && <p>Connected Account: {account}</p>}
      {/* {contract && <MovieList contract={contract} />} */}
      {
        <div>
          <input
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            placeholder="Enter movie title here..."
          />
          <button onClick={handleAddMovie}>Add Movie</button>

          <MovieList contract={contract} />
        </div>
      }
    </div>
  );
}

export default App;
