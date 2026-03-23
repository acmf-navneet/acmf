import React, { useRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export const NavigationMenu = ({ className, children, ...props }) => {
  const menuRef = useRef();
  return (
    <NavigationMenuPrimitive.Root
      ref={menuRef}
      className={cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center -translate-x-8",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
};

export const NavigationMenuList = ({ className, ...props }) => {
  const listRef = useRef();
  return (
    <NavigationMenuPrimitive.List
      ref={listRef}
      className={cn(
        "group flex flex-1 list-none items-center justify-center space-x-1",
        className
      )}
      {...props}
    />
  );
};

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);

export const NavigationMenuTrigger = ({ className, children, ...props }) => {
  const triggerRef = useRef();
  return (
    <NavigationMenuPrimitive.Trigger
      ref={triggerRef}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="relative top-[1px] m-4 ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
};

export const NavigationMenuContent = ({ className, ...props }) => {
  const contentRef = useRef();
  return (
    <NavigationMenuPrimitive.Content
      ref={contentRef}
      className={cn(
        "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
        className
      )}
      {...props}
    />
  );
};

export const NavigationMenuLink = NavigationMenuPrimitive.Link;

export const NavigationMenuViewport = ({ className, ...props }) => {
  const viewportRef = useRef();
  return (
    <div
      className={cn(
        "absolute left-0 top-full flex justify-center -translate-x-12 mr-4"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        ref={viewportRef}
        className={cn(
          "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  );
};

export const NavigationMenuIndicator = ({ className, ...props }) => {
  const indicatorRef = useRef();
  return (
    <NavigationMenuPrimitive.Indicator
      ref={indicatorRef}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
};
