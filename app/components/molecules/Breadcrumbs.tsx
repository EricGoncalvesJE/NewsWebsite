import { Link, useMatches } from "@remix-run/react";
import React from "react";
import titleCase from "~/stringUtils/titleCase";

const Breadcrumbs = () => {
  const matches = useMatches();

  const getBreadcrumbsFromPath = (pathname: string) => {
    const breadcrumbLabels = pathname.split("/").filter(Boolean);
    const isOnHomePage = breadcrumbLabels.length === 0;
    let pathnameFromBreadcrumbs = "/";

    return isOnHomePage
      ? [{ label: "Home", pathname: pathnameFromBreadcrumbs }]
      : breadcrumbLabels.map((label, index) => {
          pathnameFromBreadcrumbs += `${breadcrumbLabels[
            index
          ].toLowerCase()}/`;

          return {
            label: titleCase(label),
            pathname: pathnameFromBreadcrumbs,
          };
        });
  };

  const generateBreadcrumbs = () => {
    const breadcrumbs = matches.flatMap(({ pathname }) =>
      getBreadcrumbsFromPath(pathname),
    );
    const uniqueBreadcrumbs = breadcrumbs.filter(
      (item, index) =>
        breadcrumbs.findIndex(
          (obj) => obj.label === item.label && obj.pathname === item.pathname,
        ) === index,
    );

    return (
      <li>
        {uniqueBreadcrumbs.map(({ label, pathname }, index) => {
          const isFinalBreadCrumb = index === uniqueBreadcrumbs.length - 1;

          return isFinalBreadCrumb ? (
            <span
              key={index}
              className="pl-2 first-of-type:pl-0 first-of-type:pr-2"
            >
              {label}
            </span>
          ) : (
            <React.Fragment key={index}>
              <span className="px-2 first-of-type:pl-0">
                <Link to={pathname}>{label}</Link>
              </span>
              <span>{">"}</span>
            </React.Fragment>
          );
        })}
      </li>
    );
  };

  return (
    <div className="p-4 text-xs">
      <ul className="text-primary-light flex">{generateBreadcrumbs()}</ul>
    </div>
  );
};

export default Breadcrumbs;
