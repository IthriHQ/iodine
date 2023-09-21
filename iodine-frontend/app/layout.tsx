import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import '@/styles/tailwind.css'
import { type Metadata } from 'next'
import Providers from './providers'

export const metadata: Metadata = {
  title: {
    template: '%s - Iodine',
    default: 'Iodine - Anti-theft for web3 and blockchain',
  },
  description:
    'Safeguarding high-end assets and transactions on the blockchain. Enabling reversibility and recovery through court rulings and community-based decisions.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
