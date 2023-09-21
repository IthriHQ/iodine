import { Press_Start_2P } from 'next/font/google'

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div className="flex items-center justify-end">
      <svg aria-hidden="true" viewBox="0 0 48 48" {...props}>
      <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.97315 22.0623L17.2506 15.9558L24.528 9.84929C28.9703 6.12177 35.5932 6.7012 39.3207 11.1435C43.0483 15.5858 42.4688 22.2087 38.0265 25.9362L30.7491 32.0427L23.4717 38.1492C19.0294 41.8767 12.4065 41.2973 8.67896 36.855C4.95144 32.4127 5.53087 25.7898 9.97315 22.0623Z" fill="#9333EA" stroke="#000000" strokeWidth="4"/>
      <path d="M19.6885 21.8613L25.4261 28.6992" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className="ml-1 -mb-1 text-md font-semibold text-purple-900"><span className={pressStart.className}>Iodine</span></div>
    </div>

  )
}
