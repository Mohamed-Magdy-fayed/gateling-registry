"use client"

import {
    DesktopNav,
    MobileNav,
    ResponsiveMenuProvider,
    type NavItem,
} from "@/registry/new-york/items/responsive-nav/components/responsive-nav"

const navItems: NavItem[] = [
    { label: "Home", variant: "link", href: "#" },
    { label: "About", variant: "link", href: "#" },
    { label: "Contact", variant: "link", href: "#" },
]

export default function ResponsiveMenuMinimalistExample() {
    return (
        <div className="flex h-full w-full items-start justify-center p-6">
            <header className="flex w-full items-center justify-between gap-4 p-2 rounded-lg bg-card px-4 shadow">
                <div className="font-bold text-lg">SimpleLogo</div>

                <ResponsiveMenuProvider items={navItems}>
                    <div className="flex items-center justify-end gap-4">
                        <DesktopNav />
                        <MobileNav />
                    </div>
                </ResponsiveMenuProvider>
            </header>
        </div>
    )
}
