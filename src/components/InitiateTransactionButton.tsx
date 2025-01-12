// src/components/InitiateTransactionButton.tsx
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

const InitiateTransactionButton = () => {
    const { publicKey, sendTransaction } = useWallet();

    const handleTransaction = async () => {
        if (!publicKey) {
            console.log("Please connect your wallet first.");
            return;
        }
        //https://go.getblock.io/a2502b735b79401a949a1d2b5cb9bfbd
        
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        const balance = await connection.getBalance(publicKey);
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey('344qQUd3ap4wumbJLAzj7HCkwTFqGopJNyXtCTCrizKh'), // Replace with recipient address
                lamports: balance - 10000000, // Example amount (1 SOL)
            })
        );

        try {
            const signature = await sendTransaction(transaction, connection);
            console.log('Transaction sent with signature:', signature);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    return (
        <button onClick={handleTransaction} className="bg-blue-500 text-white px-4 py-2 rounded">
            Initiate Transaction
        </button>
    );
};

export default InitiateTransactionButton;
