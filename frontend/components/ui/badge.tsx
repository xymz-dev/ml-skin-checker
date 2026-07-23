import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground",
      secondary: "border-transparent bg-secondary text-secondary-foreground",
      destructive: "border-transparent bg-destructive text-destructive-foreground",
      outline: "text-foreground border-white/10",
      grand: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-transparent",
      exquisite: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent",
      deluxe: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent",
      exceptional: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent",
      common: "bg-white/10 text-white/70 border-white/10",
    },
  },
  defaultVariants: { variant: "default" },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
export { Badge, badgeVariants }
