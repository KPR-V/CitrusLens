import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import "@rainbow-me/rainbowkit/styles.css";
import { AppWrapper } from "../components/context";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "@bedrock_org/passport/dist/style.css";
import BedrockAuthProvider from "../components/auth/BedrockAuthProvider";
import { AuthProvider } from "../components/auth/AuthContext";
import "@/styles/globals.css";
import "@bedrock_org/passport/dist/style.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CitrusLens",
  description: "Your NFT Analytics Platform",
  icons: {
    icon: "/logo1.png",
    apple: "/logo1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BedrockAuthProvider>
          <AuthProvider>
            <AppWrapper>
              <Providers>
                {children}
                <SpeedInsights />
                <Analytics />
              </Providers>
            </AppWrapper>
          </AuthProvider>
        </BedrockAuthProvider>
      </body>
    </html>
  );
}
