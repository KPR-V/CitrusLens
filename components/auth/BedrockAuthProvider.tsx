'use client'
import { BedrockPassportProvider } from "@bedrock_org/passport";
import React from "react";

type ProviderProps = {
  children: React.ReactNode;
};

const BedrockAuthProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <BedrockPassportProvider
      baseUrl="https://api.bedrockpassport.com"
      authCallbackUrl={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`}
      tenantId={process.env.NEXT_PUBLIC_ORANGE_TENANT_ID || 'orange-abc123'}
    >
      {children}
    </BedrockPassportProvider>
  );
};

export default BedrockAuthProvider;
