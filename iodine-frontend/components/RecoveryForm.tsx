"use client"

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

import { useAccount, usePrepareContractWrite, useContractRead, useContractWrite } from 'wagmi'
import { abi as iodineAbi } from '@/abis/iodine';
import { abi as tribunalAbi } from '@/abis/tribunal';
import "dotenv/config"

const formSchema = z.object({
  transactionHash: z.string().min(1, {
    message: "Transaction hash is required.",
  }),
  reportedAddress: z.string().min(1, {
    message: "Reported address is required.",
  }),
  compromisedAddress: z.string().min(1, {
    message: "Compromised address is required.",
  }),
  stolenAmount: z.number().min(0.00000001, {
    message: "Stolen amount must be at least 0.00000001.",
  }),
  recoveryType: z.string().nonempty("Recovery type is required."),
})

export function RecoveryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionHash: "",
      reportedAddress: "",
      compromisedAddress: "",
      stolenAmount: 0,
      recoveryType: "",
    },
  })

  const { address, isConnected } = useAccount();

  const compromisedAddressTest = "0x1234567890abcdefghijklmnoq"
  const thiefAddressTest = "0x1234567890abcdefghijklmnoq"
  const stolenAmountTest = BigInt("0")

  const { data: ownedTokenIds } = useContractRead({
      address: process.env.TRIBUNAL_SMART_CONTRACT_ADDRESS as `0x${string}`,
      abi: tribunalAbi,
      functionName: 'createTheftCase', // There is a typing error here, not sure why
      args: [compromisedAddressTest, thiefAddressTest, stolenAmountTest],
      watch: true
  }) as { data: number[] };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

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
        <Button type="submit">Submit Report</Button>
      </form>
    </Form>
  )
}
