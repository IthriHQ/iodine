import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'What makes Iodine unique among blockchain platforms?',
      answer: 'Iodine offers reversible transactions and ownership recovery using legal arbitration.',
    },
    {
      question: 'How can I report unauthorized transactions?',
      answer: 'The Asset Recovery Center collects reports of stolen assets using their transaction id.',
    },
    {
      question: 'How do reversible transactions work in Iodine?',
      answer: "A Tribunal Mech NFT is created, which holds the funds until the issue is legally resolved.",
    },    
  ],
  [
    {
      question: 'How does Iodine ensure asset security?',
      answer: 'With features to freeze accounts and report thefts, Iodine prioritizes your asset protection.',
    },
    {
      question: "What's the main token for Iodine?",
      answer: 'The primary token is $IDN, serving as our core medium of exchange and value.',
    }, 
    {
      question: 'How do community decisions and legal oversight integrate?',
      answer: 'Iodine combines community feedback with legal processes to ensure fair resolutions for theft reports.',
    },
  ],
  [
    {
      question: "What's the role of the Tribunal Contract?",
      answer: 'It creates Tribunal NFTs for reported theft cases, ensuring funds are safely held during legal reviews.',
    }, 
    {
      question: 'What is the purpose of the $LAW token in Iodine?',
      answer: '$LAW is a governance token for community voting on case resolutions.',
    },
    {
      question: 'Will Iodine support other tokens in the future?',
      answer: 'Yes, support for additional tokens is coming soon.',
    },        
  ],
];



export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Don&apos;t see your question below? <a href="mailto:tolugbesan@gmail.com" className="text-slate-900 hover:underline">Contact our team</a>, and we&apos;ll assist you.
          </p>

        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
