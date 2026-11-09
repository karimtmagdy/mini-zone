import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { type UIMatch, useMatches, useLocation } from "react-router-dom"
import { PATHS } from "@/lib/router/basic.routes"
 
type RouteHandle = {
  path: string
  crumb: (data: unknown) => React.ReactNode
}

type HomeCrumb = {
  path: string
  crumb: string
}

const ROOT_CRUMBS: Record<string, HomeCrumb> = {
  panel: { path: PATHS.panel.base, crumb: "Panel" },
  settings: { path: "/settings", crumb: "Settings" },
}

function resolveHomeCrumb(pathname: string): HomeCrumb | null {
  const segment = Object.keys(ROOT_CRUMBS).find((key) => pathname.includes(key))
  return segment ? ROOT_CRUMBS[segment] : null
}

export function BreadcrumbRouter() {
  const { pathname } = useLocation()
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[]

  const homeCrumb = resolveHomeCrumb(pathname)

  // if path not [admin|settings] cant see breadcrumb result
  if (!homeCrumb) return null

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => ({
      path: match.pathname,
      crumb: match.handle.crumb(match.data),
    }))

  const allCrumbs = [
    homeCrumb,
    ...crumbs.filter((c) => c.path !== homeCrumb.path),
  ]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {allCrumbs.map(({ path, crumb }, index) => (
          <React.Fragment key={path}>
            <BreadcrumbItem>
              {index === allCrumbs.length - 1 ? (
                <BreadcrumbPage className="capitalize">{crumb}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={path}>{crumb}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < allCrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
