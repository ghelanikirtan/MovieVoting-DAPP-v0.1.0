# VoteFlicks ![](./public/voteFlicks.png={20x20})

## Overview

This project is a decentralised application (DApp) called "VoteFlicks" that is built on the Ethereum blockchain using Solidity for smart contracts, React JS for the front-end interface, and Ethers for interaction between the front-end and the blockchain. It allows users to vote for their favorite movies in a transparent, secure and tamper-proof manner. The project is deployed on Spheron using Filecoin for decentralized storage.

## Tech Stack

- **Solidity**: Used for writing smart contracts that power the voting system
- **React JS**: Used for developing the user interface of the system
- **Ethers**: Used for interaction between the React JS front-end and the Ethereum blockchain
- **Spheron**: Platform used to deploy the DApp
- **Filecoin**: Used for decentralized storage

## Features

- Users can vote for their favorite movies
- Display of vote counts
- Tamper-proof system ensuring the security and integrity of votes
- Transparent voting process visible on the blockchain
---
# Sponsor Track Selection

This project targets Polygon for contract deployment and Filecoin for overall deployment, facilitated by Spheron. This selection was made due to the unique advantages offered by these platforms.

<br>
## Polygon Contract Deployment

Polygon is a protocol and a framework for building and connecting Ethereum-compatible blockchain networks. It effectively transforms Ethereum into a full-fledged multi-chain system. Deploying the contract on Polygon provides us with scalability and flexibility while staying in the Ethereum ecosystem. 
> Contract Deployment : Polygon mumbai testnet (Contract Address: 0x58165D1783594a1683741330A4F58d9248d77d1A)
<br>

## Filecoin Deployment with Spheron  [Project Link: [Vote Flicks 🔗](https://movievoting-dapp-v0-1-0-33788b.spheron.app/)]

Filecoin is a decentralized storage system that aims to “store humanity’s most important information". It has been chosen for deployment due to its efficient and robust storage capabilities. 
 Project Deployment : Spheron via FileCoin

Spheron is a decentralized platform that makes it easier to develop, deploy, and run applications on the blockchain. It's been selected for its ease of use and wide support for various blockchain and storage technologies. 

To deploy the application with Spheron on Filecoin, follow the instructions in the official Spheron documentation.

**NOTE**: You need to ensure you have sufficient FIL (Filecoin's native token) to pay for the storage service.

By leveraging Polygon and Filecoin through Spheron, we ensure that our Movie Voting System is not only scalable and efficient but also securely and reliably stored. These selections reflect our commitment to building robust, decentralized applications that harness the full potential of blockchain technology.

---


## Installation

Before you can run this project, you need to install `Node.js` and `npm` (Node package manager). If you haven't installed these yet, you can download them [here](https://nodejs.org/).

### Clone the Repository

```bash
git clone https://github.com/ghelanikirtan/voteFlicks-dapp-v0.1.0
cd voteFlicks-dapp-v0.1.0
```

### Install Dependencies

Inside the project directory, run:

```bash
npm install
```

This command installs the necessary packages for the project.

### Configuration

1. Deploy the smart contract on Ethereum. You will need the contract's address for the next step.

2. Create a `.env` file in the root of the project. Add the contract's address and your Ethereum wallet's private key (used for deploying the contract).

```bash
REACT_APP_CONTRACT_ADDRESS=your_contract_address
REACT_APP_PRIVATE_KEY=your_private_key
```

**IMPORTANT**: Never share your private keys. Always keep them secret.

### Run the Project

To run the application, use the command:

```bash
npm start
```

## Testing

To run tests, use the command:

```bash
npm test
```

## Deployment

The project is deployed on Spheron using Filecoin for storage. If you want to deploy an updated version of the application, follow the instructions in the official Spheron documentation.

## Contributing

We welcome contributions from the community. If you wish to contribute, please take a moment to review our Contributing Guidelines.

Happy Hacking!

 
