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

function LayoutBreadCrumb({ crumbs }: TableBreadCrumbProps) {
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
          const isLastLink = index + 1 !== crumbsLength;
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

function LayoutHeader({
  title,
  children,
  description,
}: PropsWithChildren<{
  title: string;
  description?: string;
}>) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {!!description && <p className="text-sm font-light">{description}</p>}
      </div>
      {!!children && <div>{children}</div>}
    </div>
  );
}

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-3 p-2 w-full h-full">{children}</div>
  );
}

function FilterContainer({
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

function Container({ children }: PropsWithChildren) {
  return <div className="rounded-md p-4 bg-white">{children}</div>;
}

export { FilterContainer, LayoutBreadCrumb, LayoutHeader, Layout, Container };
