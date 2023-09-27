"use client"

import React from 'react'
import { type Metadata } from 'next'
import { Faqs } from '@/components/Faqs'

import { useState, useEffect } from 'react';
import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { abi as faucetAbi } from '@/abis/faucet';

export const metadata: Metadata = {
  title: 'Faucet',
}

function Faucet() {
  const { address, isConnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS as `0x${string}`,
    abi: faucetAbi,
    functionName: 'requestTokens',
    args: [walletAddress],
  })

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress || isLoading || !write) return; 

    try {
      // Call the contract function
      await write();

      // Set the transaction hash
      setTransactionHash(data ? data.hash || null : null);
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  };

  // const { data, error, isError, write } = useContractWrite(config)
  // console.log(`data - ${data}`)
  // console.log(`error - ${error}`)

  // console.log(`write - ${write}`)

  // const { isLoading } = useWaitForTransaction({
  //   hash: data?.hash,
  // })

  return (
    <>
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get Iodine ETH delivered straight to your wallet.
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
              Enter your wallet address and get 1 IodineETH.
            </p>
            <form className="mx-auto mt-10 flex max-w-md gap-x-4" onSubmit={handleSubmit}>
              <label htmlFor="wallet-address" className="sr-only">
                Wallet Address
              </label>
              <input
                id="wallet-address"
                name="address"
                type="text"
                autoComplete="wallet-address"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                placeholder="Enter recipient's Ethereum address (ex. 0x)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                disabled={!walletAddress || isLoading}
              >
                RECEIVE ETH
              </button>
            </form>
            {transactionHash && (
              <div className="mt-4 text-white">
                Transaction Hash: {transactionHash}
              </div>
            )}
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient
                  id="759c1415-0410-454c-8f7c-9a820de03641"
                  cx={0}
                  cy={0}
                  r={1}
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <Faqs />
    </>
  )
}

export default Faucet