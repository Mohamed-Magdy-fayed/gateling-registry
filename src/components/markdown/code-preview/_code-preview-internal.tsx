import { lazy, Suspense, useState, type ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Loader2Icon,
  LaptopIcon,
  TabletIcon,
  SmartphoneIcon,
} from "lucide-react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { SERVER_URL } from "@/data/env"

export type Demo =
  | "action-button/basic"
  | "action-button/default"
  | "action-button/error"
  | "action-button/require-are-you-sure"
  | "loading-swap/basic"
  | "loading-swap/large-component"
  | "multi-select/basic"
  | "multi-select/customize-badges"
  | "multi-select/form"
  | "multi-select/overflow-behavior"
  | "multi-select/search-configuration"
  | "number-input/basic"
  | "number-input/form"
  | "password-input/basic"
  | "password-input/form"
  | "responsive-nav/basic"
  | "responsive-nav/action"
  | "responsive-nav/complex"

export function CodePreviewInternal({
  dir,
  demo,
  children,
}: {
  dir: "ltr" | "rtl"
  demo: Demo
  children: ReactNode
}) {
  const componentName = demo.split("/")[0]
  const Component = getComponent(componentName, demo.split("/")[1])
  const [width, setWidth] = useState("100%")

  return (
    <Tabs defaultValue="preview" className="not-content" dir={dir}>
      <TabsList className="w-full">
        <TabsTrigger value="preview" className="flex-grow-0">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="flex-grow-0">
          Code
        </TabsTrigger>

        {/* Screen Size Controls */}
        <div className="ms-4 hidden items-center gap-2 md:flex">
          <Button
            variant={width === "100%" ? "outline" : "ghost"}
            size="icon"
            onClick={() => setWidth("100%")}
            aria-label="Desktop view"
          >
            <LaptopIcon className="size-4" />
          </Button>
          <Button
            variant={width === "768px" ? "outline" : "ghost"}
            size="icon"
            onClick={() => setWidth("768px")}
            aria-label="Tablet view"
          >
            <TabletIcon className="size-4" />
          </Button>
          <Button
            variant={width === "375px" ? "outline" : "ghost"}
            size="icon"
            onClick={() => setWidth("375px")}
            aria-label="Mobile view"
          >
            <SmartphoneIcon className="size-4" />
          </Button>
        </div>

        <OpenInV0Button
          url={`${SERVER_URL}/r/${componentName}.json`}
          className="ms-auto"
        />
      </TabsList>
      <Card className="no-scrollbar h-[450px] overflow-y-auto rounded-lg bg-transparent p-0">
        <CardContent className="h-full p-0">
          <TabsContent
            value="preview"
            className="flex h-full items-center justify-center p-4"
          >
            <Suspense
              fallback={<Loader2Icon className="size-16 animate-spin" />}
            >
              <div
                className="h-full w-full flex items-center justify-center rounded-lg border bg-background"
                style={{
                  maxWidth: width,
                  transition: "max-width 0.3s ease-in-out",
                }}
              >
                <Component />
              </div>
            </Suspense>
          </TabsContent>
          <TabsContent value="code" className="h-full">
            {children}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  )
}

function getComponent(component: string, demo: string) {
  return lazy(async () => {
    const module = await import(
      `../../../registry/new-york/examples/${component}/${demo}.tsx`
    )
    const namedExport = Object.keys(module).find(
      key => typeof module[key] === "function",
    )
    return {
      default:
        module.default ?? (namedExport ? module[namedExport] : undefined),
    }
  })
}
