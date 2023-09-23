"use client"

import { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Modal from "@/components/Modal"

import { useAccount, usePrepareContractWrite, useContractWrite,  useWaitForTransaction } from 'wagmi'
import { abi as tribunalAbi } from '@/abis/tribunal';
import "dotenv/config"
import { useDebounce } from "@/hooks/useDebounce"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  transactionHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/, "Transaction hash is required"),
  reportedAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Reported address is required"),
  compromisedAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Compromised address is required"),
  stolenAmount: z.number().min(0.00000001, {
    message: "Stolen amount must be at least 0.00000001.",
  }),
  recoveryType: z.string().nonempty("Recovery type is required."),
})

export function RecoveryForm() {
  const defaultValues = {
    transactionHash: "",
    reportedAddress: "",
    compromisedAddress: "",
    stolenAmount: 0,
    recoveryType: "",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  const { address, isConnected } = useAccount();

  const [ isSubmitError, setIsSubmitError ] = useState<boolean>(false)
  const [ isSubmitLoading, setIsSubmitLoading ] = useState<boolean>(false)
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false)
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleSuccessModalClose = () => setShowSuccessModal(false);
  // const compromisedAddressTest = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
  // const thiefAddressTest = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
  // const stolenAmountTest = BigInt("0")

  const { reportedAddress, compromisedAddress, stolenAmount } = form.watch();
  const debouncedReportedAddress= useDebounce(reportedAddress, 500)
  const debouncedCompromisedAddress = useDebounce(compromisedAddress, 500)
  const debouncedStolenAmount = useDebounce(stolenAmount, 500)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRIBUNAL_SMART_CONTRACT_ADDRESS as `0x${string}`,
    abi: tribunalAbi,
    functionName: 'createTheftCase',
    args: [
      (debouncedReportedAddress as `0x${string}`), 
      (debouncedCompromisedAddress as `0x${string}`), 
      isNaN(debouncedStolenAmount) ? BigInt(0) : BigInt(Math.floor(debouncedStolenAmount * 1e18)), 
    ],
  })

  console.log(`address - ${process.env.NEXT_PUBLIC_TRIBUNAL_SMART_CONTRACT_ADDRESS}`)
  console.log(`wallet - ${process.env.NEXT_PUBLIC_WC_PROJECT_ID}`)
  console.log(`prepareError - ${prepareError}`)


  const { data, error, isError, write } = useContractWrite(config)
  console.log(`data - ${data}`)
  console.log(`error - ${error}`)

  console.log(`write - ${write}`)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  const [isSuccess, setIsSuccess] = useState(false);
  const prevIsLoading = useRef(isLoading);

  useEffect(() => {
    if (prevIsLoading.current && !isLoading) {
      setIsSuccess(true);
    }
    prevIsLoading.current = isLoading;
  }, [isLoading]);

  // useEffect(() => {
  //   if (isSubmitError) 
  //     setShowModal(true)
  //     setIsSubmitting(false)
  //   }
  // }, [isSubmitError])



  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitError(false)
    setIsSubmitting(true)
    if (isPrepareError || isError) {
      setShowModal(true)
      setIsSubmitting(false)
      // setIsSubmitError(true)
    } 
    console.log(`Submitting - ${values}`)
    if (write) {
      setIsSuccess(false);
      write()
    }
  }

  useEffect(() => {
    if (isPrepareError || isError) {
      console.log(`error from useEffect - ${prepareError || error}`)
      setIsSubmitting(false)
    }
    if (isLoading) {
      setIsSubmitting(true)
    }
    if (isSuccess) {
      setIsSubmitting(false)
      setShowSuccessModal(true)
    }
  }, [isPrepareError, isError, isLoading, isSuccess])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="transactionHash"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Hash</FormLabel>
              <FormControl>
                <Input placeholder="Enter transaction hash" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reportedAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reported Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter reported address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="compromisedAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compromised Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter compromised address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stolenAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stolen Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter stolen amount"
                  {...field}
                  type="number"
                  min="0.00000001"
                  step="0.00000001"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recoveryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recovery Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Select a Recovery Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="token">Token</SelectItem>
                    <SelectItem value="asset">Asset</SelectItem>
                    <SelectItem value="ownership">Ownership</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit Report</Button> */}
        {/* {isSubmitLoading ? (
          <Button disabled>
            <Loader2 className="mr-2"
          </Button>
        ) : (
          <Button className={`${isLoading ? 'animate-pulse' : ''}`} disabled={!write || isLoading} type="submit">Submit Report {isLoading ? '- loading' : ''}</Button>
        )} */}
        {isConnected ? (
          <Button className={`${isLoading ? 'animate-pulse' : ''}`} disabled={!write || isSubmitting} type="submit">
            {isSubmitting && !isSuccess && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            {(isSubmitting && !isSuccess) ? 'Submitting' : 'Submit Report'}
          </Button>
        ) : (
          <ConnectButton showBalance={{smallScreen: true, largeScreen: false}} />
        )}
        
        <Modal overlayHeader={false} isOpen={showModal} onClose={handleClose}>
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-center">
                <svg aria-hidden="true" viewBox="0 0 48 48" className="h-10 mx-auto">
                <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.97315 22.0623L17.2506 15.9558L24.528 9.84929C28.9703 6.12177 35.5932 6.7012 39.3207 11.1435C43.0483 15.5858 42.4688 22.2087 38.0265 25.9362L30.7491 32.0427L23.4717 38.1492C19.0294 41.8767 12.4065 41.2973 8.67896 36.855C4.95144 32.4127 5.53087 25.7898 9.97315 22.0623Z" fill="#9333EA" stroke="#000000" strokeWidth="4"/>
                <path d="M19.6885 21.8613L25.4261 28.6992" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                  <p className="mt-3 px-6 py-3 bg-purple-200 opacity-50 rounded-md text-purple-600 text-sm font-semibold line-wrap overflow-auto">                
                    <span className="text-purple-600">Error: </span> {(prepareError || error)?.message}
                  </p>
                </div>
              </div>
            </div>
        </Modal>
        <Modal overlayHeader={false} isOpen={showSuccessModal} onClose={handleSuccessModalClose}>
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-center">
                <svg aria-hidden="true" viewBox="0 0 48 48" className="h-10 mx-auto">
                <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.97315 22.0623L17.2506 15.9558L24.528 9.84929C28.9703 6.12177 35.5932 6.7012 39.3207 11.1435C43.0483 15.5858 42.4688 22.2087 38.0265 25.9362L30.7491 32.0427L23.4717 38.1492C19.0294 41.8767 12.4065 41.2973 8.67896 36.855C4.95144 32.4127 5.53087 25.7898 9.97315 22.0623Z" fill="#9333EA" stroke="#000000" strokeWidth="4"/>
                <path d="M19.6885 21.8613L25.4261 28.6992" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                  <p className="mt-3 px-6 py-3 bg-purple-200 opacity-50 rounded-md text-purple-600 text-sm font-semibold line-wrap overflow-auto">                
                    Your case has been submitted successfully!
                  </p>
                </div>
              </div>
            </div>
        </Modal>        
      </form>
    </Form>
  )
}
