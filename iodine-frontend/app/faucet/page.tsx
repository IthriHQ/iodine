import React from 'react'
import { type Metadata } from 'next'
import { Faqs } from '@/components/Faqs'

export const metadata: Metadata = {
  title: 'Faucet',
}

function Faucet() {
  return (
    <>
      Faucet
      <Faqs />
    </>
  )
}

export default Faucet