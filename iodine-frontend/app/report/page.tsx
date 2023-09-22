import Link from 'next/link'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RecoveryForm } from '@/components/RecoveryForm'

export const metadata: Metadata = {
  title: 'Asset Recovery Center',
}

export default function ReportTheft() {
  return (
    <>
    <SlimLayout>
      <div className="flex">
        <h1 className='text-lg font-semibold'>Asset Recovery Center</h1>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-800">
        Create a new case
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Not sure about your transaction hash?{' '}
        <Link
          target='_blank'
          rel='noopener'
          href="https://gnosis-chiado.blockscout.com/"
          className="font-medium text-blue-600 hover:underline"
        >
          check here
        </Link>{' '}
        
      </p>
      <div className="mt-10" >
        <RecoveryForm />
      </div>
    </SlimLayout>
    </>
  )
}
