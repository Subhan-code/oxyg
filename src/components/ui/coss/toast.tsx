"use client"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import * as React from "react"
import { cn } from "../../../lib/utils"
import { XIcon } from "lucide-react"

const ToastRoot = ToastPrimitive.Root as any
const ToastPositioner = ToastPrimitive.Positioner as any

export const toastManager = ToastPrimitive.createToastManager()
export const anchoredToastManager = ToastPrimitive.createToastManager()

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastPrimitive.Provider toastManager={toastManager}>
        <ToastPrimitive.Portal>
          <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
          <ToastRoot className="group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:slide-out-to-right data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:slide-in-from-right bg-background">
            <div className="grid gap-1">
              <ToastPrimitive.Title className="text-sm font-semibold" />
              <ToastPrimitive.Description className="text-sm opacity-90" />
            </div>
            <ToastPrimitive.Close className="absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100">
              <XIcon className="h-4 w-4" />
            </ToastPrimitive.Close>
          </ToastRoot>
        </ToastPrimitive.Portal>
      </ToastPrimitive.Provider>

      <ToastPrimitive.Provider toastManager={anchoredToastManager}>
        <ToastPrimitive.Portal>
          <ToastPositioner sideOffset={8}>
            <ToastRoot className="group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-2 px-3 shadow-lg transition-all data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:slide-out-to-bottom-1 data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:slide-in-from-bottom-1 bg-background">
              <div className="grid gap-0.5">
                <ToastPrimitive.Title className="text-sm font-medium" />
                <ToastPrimitive.Description className="text-xs opacity-90" />
              </div>
            </ToastRoot>
          </ToastPositioner>
        </ToastPrimitive.Portal>
      </ToastPrimitive.Provider>
    </>
  )
}
