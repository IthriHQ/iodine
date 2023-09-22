import React from 'react'
import { type Metadata } from 'next'
import TribunalTable from '@/components/TribunalTable'

export const metadata: Metadata = {
  title: 'Tribunal',
}

function Tribunal() {
  return (
    <section className='p-5'>
      <h2 className="text-2xl font-semibold text-gray-700 tracking-tight">Tribunal Cases</h2>
      <TribunalTable />
    </section>
  )
}

export default Tribunal