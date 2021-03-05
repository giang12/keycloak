import React, { isValidElement } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs, { BreadcrumbData } from "use-react-router-breadcrumbs";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { Breadcrumb, BreadcrumbItem } from "@patternfly/react-core";

import { useRealm } from "../../context/realm-context/RealmContext";
import { routes } from "../../route-config";
import { GroupBreadCrumbs } from "./GroupBreadCrumbs";

export const PageBreadCrumbs = () => {
  const { t } = useTranslation();
  const { realm } = useRealm();
  const elementText = (crumb: BreadcrumbData) =>
    isValidElement(crumb.breadcrumb) && crumb.breadcrumb.props.children;

  const crumbs = _.uniqBy(
    useBreadcrumbs(routes(t), {
      excludePaths: ["/", `/${realm}`],
    }),
    elementText
  );
  return (
    <>
      {crumbs.length > 1 && (
        <Breadcrumb>
          {crumbs.map(({ match, breadcrumb: crumb }, i) => (
            <BreadcrumbItem key={i} isActive={crumbs.length - 1 === i}>
              {crumbs.length - 1 !== i && <Link to={match.url}>{crumb}</Link>}
              {crumbs.length - 1 === i && <>{crumb}</>}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}
      <GroupBreadCrumbs />
    </>
  );
};
