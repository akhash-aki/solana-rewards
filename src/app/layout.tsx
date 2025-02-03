
import './globals.css';
import WalletContextProvider from '../components/WalletContextProvider';
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <WalletContextProvider>{children}</WalletContextProvider>
            </body>
        </html>
    );
}
