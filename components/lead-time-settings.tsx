"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const leadTimeFormSchema = z.object({
  productCategory: z.string({
    required_error: "Please select a product category.",
  }),
  leadTime: z.coerce.number().min(1, "Lead time must be at least 1 day.").max(365, "Lead time cannot exceed 365 days."),
})

type LeadTimeFormValues = z.infer<typeof leadTimeFormSchema>

const defaultValues: Partial<LeadTimeFormValues> = {
  leadTime: 7,
}

export function LeadTimeSettings() {
  const form = useForm<LeadTimeFormValues>({
    resolver: zodResolver(leadTimeFormSchema),
    defaultValues,
  })

  function onSubmit(data: LeadTimeFormValues) {
    toast({
      title: "Lead time updated",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home-garden">Home & Garden</SelectItem>
                  <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the product category to set the lead time.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leadTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead Time (days)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Set the lead time in days for the selected product category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Lead Time</Button>
      </form>
    </Form>
  )
}

