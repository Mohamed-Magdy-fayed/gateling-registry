"use client"

import {
    DesktopNav,
    MobileNav,
    ResponsiveMenuProvider,
    type NavItem,
} from "@/registry/new-york/items/responsive-nav/components/responsive-nav"

const navItems: NavItem[] = [
    { label: "Home", variant: "link", href: "#" },
    {
        label: "Services",
        variant: "children",
        children: [
            { label: "Web Development", variant: "link", href: "#web-dev" },
            { label: "Mobile Development", variant: "link", href: "#mobile-dev" },
        ],
    },
    {
        label: "Products",
        variant: "children",
        children: [
            { label: "Product A", variant: "link", href: "#prod-a" },
            { label: "Product B", variant: "link", href: "#prod-b" },
            { label: "Product C", variant: "link", href: "#prod-c" },
        ],
    },
    { label: "Blog", variant: "link", href: "#" },
    { label: "About Us", variant: "link", href: "#" },
    { label: "Contact", variant: "link", href: "#" },
]

export default function ResponsiveMenuNestedExample() {
    return (
        <ResponsiveMenuProvider items={navItems}>
            <div className="flex h-full items-start justify-center p-6">
                <header className="flex w-full items-center justify-between gap-4 p-2 rounded-lg bg-card px-4 shadow">
                    <div className="font-bold text-lg">MegaCorp</div>

                    <div className="flex w-full items-center justify-end gap-4">
                        <DesktopNav />
                        <MobileNav />
                    </div>
                </header>
            </div>
        </ResponsiveMenuProvider>
    )
}
