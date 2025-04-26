'use client'
import { LoginPanel } from "@bedrock_org/passport";

export default function AuthLoginPanel() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50">
      <LoginPanel
        title="Sign in to CitrusLens"
        logo="https://irp.cdn-website.com/e81c109a/dms3rep/multi/orange-web3-logo-v2a-20241018.svg"
        logoAlt="Orange Web3"
        walletButtonText="Connect Wallet"
        showConnectWallet={false}
        separatorText="OR"
        features={{
          enableWalletConnect: false,
          enableAppleLogin: true,
          enableGoogleLogin: true,
          enableEmailLogin: true,
        }}
        titleClass="text-xl font-bold text-orange-600"
        logoClass="ml-2 md:h-8 h-6"
        panelClass="container p-2 md:p-8 rounded-2xl max-w-[480px] bg-white shadow-lg"
        buttonClass="hover:border-orange-500 transition-colors"
        separatorTextClass="bg-white text-gray-500"
        separatorClass="bg-orange-200"
        linkRowClass="justify-center"
        headerClass="justify-center"
      />
    </div>
  );
}
