"use client"

import { useState } from "react";
import Modal from "@/components/Modal";
// import TwoCardsLayout from "./TwoCardsLayout";
import Link from "next/link";

export default function ClientSideModal() {
  const [showModal, setShowModal] = useState(true);
  const handleClose = () => setShowModal(true);
  
  return (
    <Modal overlayHeader={false} isOpen={showModal} onClose={handleClose}>
        <div className="w-full max-w-sm bg-white shadow-lg rounded-xl">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center">
            <svg aria-hidden="true" viewBox="0 0 48 48" className="h-10 mx-auto">
            <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M9.97315 22.0623L17.2506 15.9558L24.528 9.84929C28.9703 6.12177 35.5932 6.7012 39.3207 11.1435C43.0483 15.5858 42.4688 22.2087 38.0265 25.9362L30.7491 32.0427L23.4717 38.1492C19.0294 41.8767 12.4065 41.2973 8.67896 36.855C4.95144 32.4127 5.53087 25.7898 9.97315 22.0623Z" fill="#9333EA" stroke="#000000" strokeWidth="4"/>
            <path d="M19.6885 21.8613L25.4261 28.6992" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              {/* <p className="mt-3 px-6 py-3 bg-purple-200 opacity-50 rounded-md text-purple-600 text-md font-semibold">
                The <span className="text-purple-600">Iodine Dashboard </span> is coming soon
              </p> */}
              <div>
                <p className="mt-2 text-purple-500 font-display">
                  Vote transparently!
                </p>
              </div>

                <section className="text-gray-600 body-font overflow-hidden">
                  <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-12">
                      <div className="bg-[#e7ecef] p-12 md:w-1/2 flex flex-col items-start">
                        <h2 className="text-sm title-font font-semibold text-gray-700 mt-4 mb-4">Compromised Wallet Address</h2>
                              
                        
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                          // onClick={() => setOpen(false)}
                        >
                          Vote

                        </button>
                        
                      </div>
                      <div className="bg-[#e7ecef] p-12 md:w-1/2 flex flex-col items-start rounded-md">
                        <div>
                        <h2 className="text-sm title-font font-semibold text-gray-700 mt-4 mb-4">Reported wallet Address</h2>
                        </div>
                        {/* <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                        </div> */}
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                          // onClick={() => setOpen(false)}
                        >
                          Vote

                        </button>
                      </div>
                    </div>
                  </div>
                </section>


            </div>
          </div>
        </div>
    </Modal>
  )
}
