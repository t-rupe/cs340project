/**
 * This code uses components from ShadCN UI library, an open source reusuable component provider. This is a primitive component for creating a collapsible
 * Source: https://ui.shadcn.com/
 */
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
