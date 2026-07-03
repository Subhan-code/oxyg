"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Button } from "../ui/coss/button"
import { cn } from "../../lib/utils"

export function CopyButton({ textToCopy = "https://example.com", className }: { textToCopy?: string, className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (copied) return
    if (textToCopy && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
    }
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      className={cn("w-32 select-none overflow-hidden transition-all", className)}
    >
      <div className="relative flex w-4 h-4 mr-2 items-center justify-center shrink-0">
        <AnimatePresence mode="popLayout" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <CheckIcon className="w-4 h-4 text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <CopyIcon className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center overflow-hidden h-full">
        <span className="font-medium shrink-0">Copy</span>
        <AnimatePresence initial={false}>
          {copied && (
            <motion.span
              key="ed"
              initial={{ width: 0, opacity: 0, x: -10 }}
              animate={{ width: "auto", opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block overflow-hidden whitespace-nowrap font-medium text-green-500 origin-left"
            >
              ed
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Button>
  )
}


