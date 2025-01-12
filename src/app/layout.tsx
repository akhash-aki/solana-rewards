
import './globals.css';
import WalletContextProvider from '../components/WalletContextProvider';


export const metadata = {
    title: 'Solana Rewards',
    description: 'Connect Solana wallet and manage rewards',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <WalletContextProvider>{children}</WalletContextProvider>
            </body>
        </html>
    );
}
