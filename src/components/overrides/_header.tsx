import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { H3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function CustomHeader({ children }: { children: ReactNode }) {
    return (
        <div className={cn(
            "grid grid-cols-3 gap-4 px-4 h-[var(--header-height)] bg-transparent sticky top-0 z-50 w-full"
        )}>
            <a href="/" className="flex items-center gap-2">
                <H3>Gateling Registry</H3>
            </a>

            <NavigationMenu className="mx-auto hidden md:flex">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/getting-started/introduction">
                            Docs
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/components">
                            Components
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/contributing/contributing-code">
                            Contributing
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-2 justify-end">
                {children}
            </div>
        </div>
    );
}