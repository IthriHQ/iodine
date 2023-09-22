import { Press_Start_2P } from 'next/font/google'

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export function Wordmark(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div className="ml-1 -mb-1 text-md font-semibold text-purple-900"><span className={pressStart.className}>Iodine</span></div>
  )
}
