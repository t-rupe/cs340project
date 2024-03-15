/**
 * This code uses components from ShadCN UI library, an open source reusuable component provider.
 * Source: https://ui.shadcn.com/
 */

"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function ToastSimple() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Succesfully 🥳",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
