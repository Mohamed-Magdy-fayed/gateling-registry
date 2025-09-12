"use client"

import {
    DesktopNav,
    MobileNav,
    ResponsiveMenuProvider,
    type NavItem,
} from "@/registry/new-york/items/responsive-nav/components/responsive-nav"
import { BellIcon, LogOutIcon, UserIcon } from "lucide-react"

const navItems: NavItem[] = [
    { label: "Home", variant: "link", href: "#" },
    { label: "Dashboard", variant: "link", href: "#" },
    { label: "Projects", variant: "link", href: "#" },
    {
        label: "Notifications",
        variant: "action",
        action: () => alert("Notifications clicked!"),
        icon: <BellIcon className="size-4" />
    },
    {
        label: "Profile",
        variant: "action",
        action: () => alert("Profile clicked!"),
        icon: <UserIcon className="size-4" />
    },
    {
        label: "Logout",
        variant: "action",
        action: () => alert("Logout clicked!"),
        icon: <LogOutIcon className="size-4" />
    },
]

export default function ResponsiveMenuActionsExample() {
    return (
        <ResponsiveMenuProvider items={navItems}>
            <div className="flex h-full w-full items-start justify-center p-6">
                <header className="flex w-full justify-between items-center gap-4 rounded-lg bg-card p-4 px-4 shadow">
                    <div className="flex-shrink-0 font-bold text-lg">WebApp</div>
                    <DesktopNav />
                    <div className="hidden flex-shrink-0 items-center gap-2 font-bold text-lg sm:flex">
                        <p>Actions</p>
                        <MobileNav />
                    </div>
                </header>
            </div>
        </ResponsiveMenuProvider>
    )
}
