'use client';

import { DynamicContextProvider, DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { SolanaWalletConnectors } from '@dynamic-labs/solana';
import { MoonPayProvider, MoonPayBuyWidget } from '@moonpay/moonpay-react';
import { useEffect, useState } from 'react';

function WalletAndMoonPay() {
  const { primaryWallet, user } = useDynamicContext();
  const [walletAddress, setWalletAddress] = useState<string>('');

  useEffect(() => {
    if (primaryWallet?.address) {
      setWalletAddress(primaryWallet.address);
    }
  }, [primaryWallet]);

  const handleUrlSignatureRequested = async (widgetUrl: string) => {
    try {
      const response = await fetch('/api/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: widgetUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to get signature');
      }

      const data = await response.json();
      return data.signature;
    } catch (error) {
      console.error('Error getting signature:', error);
      throw error;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-900">
          Buy $NRG Token
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Create your wallet and buy crypto in one place
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dynamic Wallet Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Step 1: Create or Connect Wallet
            </h2>
            <p className="text-gray-600 mb-6">
              {user ? 'Your wallet is connected!' : 'Connect your wallet to continue'}
            </p>
            
            <div className="mb-6">
              <DynamicWidget />
            </div>

            {walletAddress && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-medium text-green-800 mb-1">
                  ✓ Wallet Connected
                </p>
                <p className="text-xs text-green-700 break-all">
                  {walletAddress}
                </p>
              </div>
            )}
          </div>

          {/* MoonPay Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Step 2: Buy Crypto
            </h2>
            <p className="text-gray-600 mb-6">
              Purchase SOL or USDC with card or bank transfer
            </p>

            {!user && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  ⚠️ Please create or connect your wallet first
                </p>
              </div>
            )}

            <MoonPayProvider
              apiKey={process.env.NEXT_PUBLIC_MOONPAY_API_KEY || ''}
              debug
            >
              <MoonPayBuyWidget
                variant="embedded"
                onUrlSignatureRequested={handleUrlSignatureRequested}
                currencyCode="sol"
                walletAddress={walletAddress || undefined}
              />
            </MoonPayProvider>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">
            How it works
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Create a wallet using your email (no app needed)</li>
            <li>Buy SOL or USDC using MoonPay</li>
            <li>We'll automatically convert it to $NRG tokens</li>
            <li>Tokens will appear in your wallet within minutes</li>
          </ol>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || '',
        walletConnectors: [SolanaWalletConnectors],
      }}
    >
      <WalletAndMoonPay />
    </DynamicContextProvider>
  );
}
