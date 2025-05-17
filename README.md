# Wrap SOL to WSOL (Devnet)

This project wraps SOL to WSOL (Wrapped SOL) on the Solana Devnet using Node.js and TypeScript.

## Features

* Connects to Solana Devnet.
* Automatically creates an Associated Token Account (ATA) for WSOL if it does not exist.
* Transfers SOL and assigns it to the token program to become WSOL.

## Prerequisites

* Node.js (v18+ recommended)
* Solana CLI installed and configured to Devnet
* A funded Devnet wallet

## Installation

```bash
# Clone the repo
git clone https://github.com/fzn-dy/Wrap-SOL.git
cd Wrap-SOL

# Install dependencies
npm install
```

## Setup

1. Copy the `.env.copy` to `.env`:

```bash
cp .env.copy .env
```

2. Open `.env` and add your private key array:

```
PRIVATE_KEY=[your,private,key,array,...]
```

You can export your keypair from Solana CLI like this:

```bash
solana-keygen export --outfile ~/.config/solana/devnet.json
```

Then open and copy the JSON array into the `.env` file.

## Run the Script

```bash
npm run start
```

### Console Output (Example)

```
Creating WSOL ATA...
✅ Wrapping complete! Tx: 5rN...abc
Your WSOL ATA: 3nb...xyz
```

## Notes

* Ensure your Devnet wallet has at least 1 SOL.
* If lamports are insufficient, the transaction will fail with a message like:

  ```
  Transfer: insufficient lamports 997955720, need 1000000000
  ```

  This means your wallet balance is slightly below 1 SOL after rent/fee.