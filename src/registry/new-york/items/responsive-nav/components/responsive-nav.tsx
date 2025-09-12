"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { ChevronDownIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type ActionItem = { variant: "action"; action: () => void }
type LinkItem = { variant: "link"; href: string }
type ChildrenItem = { variant: "children"; children: NavItem[] }
type NavItemVariants = ActionItem | LinkItem | ChildrenItem
export type NavItem = {
  label: string
  icon?: React.ReactNode
} & NavItemVariants

interface ResponsiveMenuContextType {
  visibleItems: NavItem[]
  hiddenItems: NavItem[]
  setVisibleItems: React.Dispatch<React.SetStateAction<NavItem[]>>
  setHiddenItems: React.Dispatch<React.SetStateAction<NavItem[]>>
  items: NavItem[]
}

const ResponsiveMenuContext = React.createContext<ResponsiveMenuContextType | undefined>(undefined)

function useResponsiveMenu() {
  const context = React.useContext(ResponsiveMenuContext)
  if (!context) {
    throw new Error("useResponsiveMenu must be used within a ResponsiveMenuProvider")
  }
  return context
}

export function ResponsiveMenuProvider({ items, children }: { items: NavItem[]; children: React.ReactNode }) {
  const [visibleItems, setVisibleItems] = React.useState<NavItem[]>(items);
  const [hiddenItems, setHiddenItems] = React.useState<NavItem[]>([]);

  return (
    <ResponsiveMenuContext.Provider value={{ visibleItems, hiddenItems, setVisibleItems, setHiddenItems, items }}>
      <div className="w-full">{children}</div>
    </ResponsiveMenuContext.Provider>
  );
}

export function DesktopNav() {
  const { visibleItems, items, setVisibleItems, setHiddenItems } = useResponsiveMenu()

  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemsRef = React.useRef<(HTMLLIElement | null)[]>([]);

  const MORE_BUTTON_WIDTH = 100;

  React.useLayoutEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const containerWidth = entry.contentRect.width;
      let accumulatedWidth = 100;
      const newVisible: NavItem[] = [];
      const newHidden: NavItem[] = [];

      const itemWidths = itemsRef.current.map(ref => ref?.offsetWidth ?? 0);
      const totalWidth = itemWidths.reduce((sum, width) => sum + width, 0);

      const needsMoreButton = totalWidth > containerWidth;
      const availableWidth = needsMoreButton ? containerWidth - MORE_BUTTON_WIDTH : containerWidth;

      for (let i = 0; i < items.length; i++) {
        const itemWidth = itemWidths[i];
        if (accumulatedWidth + itemWidth <= availableWidth) {
          newVisible.push(items[i]);
          accumulatedWidth += itemWidth;
        } else {
          newHidden.push(...items.slice(i));
          break;
        }
      }

      setVisibleItems(newVisible);
      setHiddenItems(newHidden);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="w-full" ref={containerRef}>
      {/* This menu is ONLY for measurement. It is not visible. */}
      <NavigationMenu className="absolute invisible h-0 w-full overflow-hidden">
        <NavigationMenuList>
          {items.map((item, i) => (
            <NavigationMenuItem key={item.label} ref={el => { itemsRef.current[i] = el; }}>
              <span className={cn(navigationMenuTriggerStyle(), "flex-shrink-0")}>
                {item.label}
              </span>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          {visibleItems.map((item) => (
            <RenderItem item={item} isMobile={false} key={item.label} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export function MobileNav() {
  const { hiddenItems } = useResponsiveMenu()
  if (hiddenItems.length === 0) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <MenuIcon className="size-4" />
          <span className="sr-only">More</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>Menu</SheetHeader>
        <div className="p-4 flex flex-col gap-2 items-stretch">
          {hiddenItems.map((item) => (
            <RenderItem item={item} isMobile={true} key={item.label} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function RenderItem({ item, isMobile }: { item: NavItem; isMobile: boolean }) {
  const renderContent = () => {
    switch (item.variant) {
      case "action":
        return (
          <Button variant="ghost" onClick={item.action}>
            {item.icon} {item.label}
          </Button>
        )
      case "link":
        return (
          <Button variant="ghost" asChild className={cn("flex items-center gap-2")}>
            <a href={item.href}>{item.icon} {item.label}</a>
          </Button>
        )
      case "children":
        if (isMobile) {
          return (
            <Collapsible key={item.label}>
              <CollapsibleTrigger className="group flex items-center justify-center w-full rounded-md p-2" asChild>
                <Button variant="ghost" >
                  {item.label} <ChevronDownIcon size={20} className="ltr:-rotate-90 rtl:rotate-90 group-data-[state=open]:rotate-0 transition-transform duration-200" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4">
                {item.children.map((subItem) => (
                  <RenderItem item={subItem} isMobile={true} key={subItem.label} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )
        }
        return (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuTrigger className={`${buttonVariants({ variant: "ghost" })}`}>{item.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 ">
                {item.children.map((subItem) => (
                  <li key={subItem.label}>
                    <RenderItem item={subItem} isMobile={false} />
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )
      default:
        return null
    }
  }

  if (isMobile) {
    if (item.variant === "link" || item.variant === "action") {
      return <SheetClose asChild>{renderContent()}</SheetClose>
    }
    return renderContent()
  }

  if (item.variant === "link") {
    return <NavigationMenuItem>{renderContent()}</NavigationMenuItem>
  }
  return renderContent()
}
