/**
 * A customized Toast component. Toast being a notification component that pops up on the screen to inform the user of a specific action or event.
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
