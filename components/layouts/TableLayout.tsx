import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NextUrlType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment, PropsWithChildren } from "react";

type TableBreadCrumbProps = {
  crumbs: Array<{ name: string; link: NextUrlType; isCurrentPage?: boolean }>;
};

function TableBreadCrumb({ crumbs }: TableBreadCrumbProps) {
  const crumbsLength = crumbs.length;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin">Admin</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {crumbs.map((item, index) => {
          const isLastLink = index === crumbsLength;
          return (
            <Fragment key={item.name}>
              <BreadcrumbItem key={item.name}>
                {item?.isCurrentPage ? (
                  <BreadcrumbPage className="font-semibold">
                    {item.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.link} className="font-semibold">
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {isLastLink && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function TableHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      {!!description && <p className="text-sm font-light">{description}</p>}
    </div>
  );
}

function TableLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-3 p-2 w-full h-full">{children}</div>
  );
}

function FilterBox({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 lg:grid-cols-3 bg-white p-4 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export { FilterBox, TableBreadCrumb, TableHeader, TableLayout };
