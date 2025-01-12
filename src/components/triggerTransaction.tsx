import { Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';

export const handleTransaction = async (
    wallet: WalletContextState,
    recipientAddress: string,
    connectionEndpoint: string = 'https://api.devnet.solana.com'
): Promise<string | undefined> => {
    const { publicKey, sendTransaction } = wallet;

    if (!publicKey) {
        console.log("Please connect your wallet first.");
        return;
    }

    const connection = new Connection(connectionEndpoint, 'confirmed');
    const balance = await connection.getBalance(publicKey);

    if (balance < 10000000) {
        console.error("Insufficient balance.");
        return;
    }

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(recipientAddress),
            lamports: balance - 10000000, // Subtract a small amount for transaction fees
        })
    );

    try {
        const signature = await sendTransaction(transaction, connection);
        console.log('Transaction sent with signature:', signature);
        return signature;
    } catch (error) {
        console.error('Transaction failed:', error);
        throw error;
    }
};
