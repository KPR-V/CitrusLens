'use client'
import { useBedrockPassport } from "@bedrock_org/passport";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const { loginCallback } = useBedrockPassport();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const login = async (token: string, refreshToken: string) => {
      const success = await loginCallback(token, refreshToken);
      if (success) {
        router.push("/");
      }
    };

    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');

    if (token && refreshToken) {
      login(token, refreshToken);
    }
  }, [loginCallback, router, searchParams]);

  return <div className="flex justify-center items-center min-h-screen">Signing in to CitrusLens...</div>;
}
