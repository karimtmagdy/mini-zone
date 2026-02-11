import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { type UIMatch, useMatches } from "react-router-dom";

type RouteHandle = {
  path: string;
  crumb: (data: unknown) => React.ReactNode;
};
export default function BreadcrumbSidebar() {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => {
      const crumb = match.handle.crumb(match.data);
      return {
        path: match.pathname,
        crumb,
      };
    });

  const homeCrumb = {
    path: "/admin",
    crumb: "Admin",
  };

  const allCrumbs = [homeCrumb, ...crumbs.filter((c) => c.path !== "/admin")];
  console.log(allCrumbs);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {allCrumbs.map(({ path, crumb }, index) => (
          <React.Fragment key={path}>
            <BreadcrumbItem>
              {index === allCrumbs.length - 1 ? (
                <BreadcrumbPage className="capitalize">{crumb}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink to={path}>{crumb}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < allCrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
