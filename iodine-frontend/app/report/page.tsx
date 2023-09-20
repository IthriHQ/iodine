import Link from 'next/link'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'

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
        Not sure about your transaction id?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          check here
        </Link>{' '}
        
      </p>
      <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
        <TextField
          label="Transaction Id"
          name="transaction-id"
          type="text"
          autoComplete="text"
          required
        />
        <div>
          <Button type="submit" variant="solid" color="purple" className="w-full">
            <span>
              Submit <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
    </>
  )
}
