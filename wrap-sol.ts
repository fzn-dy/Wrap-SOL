import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import dotenv from 'dotenv';

dotenv.config();

async function wrapSOL() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const secret = JSON.parse(process.env.PRIVATE_KEY || "") as number[];
  const payer = Keypair.fromSecretKey(new Uint8Array(secret));

  console.log("🔑 Wallet Public Key:", payer.publicKey.toBase58());

  const WSOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");
  const ata = await getAssociatedTokenAddress(WSOL_MINT, payer.publicKey);

  const lamports = 950_000_000; // 0.95 SOL

  const balance = await connection.getBalance(payer.publicKey);
  console.log("💰 Current balance (lamports):", balance);

  if (balance < lamports) {
    console.error("❌ Insufficient SOL balance to wrap into WSOL.");
    return;
  }

  const transaction = new Transaction();

  const accountInfo = await connection.getAccountInfo(ata);
  if (!accountInfo) {
    console.log("📦 Creating Associated Token Account (ATA) for WSOL...");
    transaction.add(
      createAssociatedTokenAccountInstruction(
        payer.publicKey,
        ata,
        payer.publicKey,
        WSOL_MINT
      )
    );
  } else {
    console.log("✅ ATA for WSOL already exists:", ata.toBase58());
  }

  console.log("🔄 Wrapping SOL into WSOL...");
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: ata,
      lamports,
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);
  console.log("✅ Wrap successful! Transaction signature:", signature);
  console.log("📍 Your WSOL is now at:", ata.toBase58());
}

wrapSOL().catch((err) => {
  console.error("🚨 An error occurred while wrapping SOL to WSOL:");
  console.error(err);
});
