"use client"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import * as React from "react"
import { cn } from "../../../lib/utils"

const MenuPortal = MenuPrimitive.Portal as any
const MenuPositioner = MenuPrimitive.Positioner as any

export const Menu = MenuPrimitive.Root

export const MenuTrigger = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Trigger ref={ref as any} className={className} {...props} />
))
MenuTrigger.displayName = "MenuTrigger"

export const MenuPopup = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Popup>
>(({ className, ...props }, ref) => (
  <MenuPortal>
    <MenuPositioner>
      <MenuPrimitive.Popup
        ref={ref}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95 data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:zoom-in-95",
          className
        )}
        {...props}
      />
    </MenuPositioner>
  </MenuPortal>
))
MenuPopup.displayName = "MenuPopup"

export const MenuGroup = MenuPrimitive.Group

export const MenuGroupLabel = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.GroupLabel>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.GroupLabel
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
MenuGroupLabel.displayName = "MenuGroupLabel"

export const MenuItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> & { variant?: "destructive" }
>(({ className, variant, ...props }, ref) => (
  <MenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4",
      variant === "destructive" &&
        "text-destructive data-[highlighted]:text-destructive data-[highlighted]:bg-destructive/10",
      className
    )}
    {...props}
  />
))
MenuItem.displayName = "MenuItem"

export const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem> & { variant?: "switch" }
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuPrimitive.CheckboxItemIndicator>
        <div className="h-2 w-2 rounded-sm bg-current" />
      </MenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
))
MenuCheckboxItem.displayName = "MenuCheckboxItem"

export const MenuRadioGroup = MenuPrimitive.RadioGroup

export const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuPrimitive.RadioItemIndicator>
         <div className="h-2 w-2 rounded-full bg-current" />
      </MenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
))
MenuRadioItem.displayName = "MenuRadioItem"

export const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenuSeparator.displayName = "MenuSeparator"

export const MenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
MenuShortcut.displayName = "MenuShortcut"

export const MenuSub = MenuPrimitive.SubmenuRoot

export const MenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubmenuTrigger>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubmenuTrigger>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.SubmenuTrigger
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </MenuPrimitive.SubmenuTrigger>
))
MenuSubTrigger.displayName = "MenuSubTrigger"

export const MenuSubPopup = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Popup>
>(({ className, ...props }, ref) => (
  <MenuPortal>
    <MenuPositioner>
      <MenuPrimitive.Popup
        ref={ref}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95 data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:zoom-in-95",
          className
        )}
        {...props}
      />
    </MenuPositioner>
  </MenuPortal>
))
MenuSubPopup.displayName = "MenuSubPopup"

