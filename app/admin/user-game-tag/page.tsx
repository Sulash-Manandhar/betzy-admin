import {
  FilterContainer,
  Layout,
  LayoutBreadCrumb,
  LayoutHeader,
} from "@/components/layouts";
import { useAuthToken } from "@/context/AuthTokenProvider";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/lib/constant";
import { User, UserFilter } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export default function UserGameTag() {
  const { token } = useAuthToken();
  const [filterParams, setFilterParams] = useState<UserFilter>({
    email: "",
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_SIZE,
    membership: "",
  });

  const columns = useMemo(() => {
    const columns: ColumnDef<User>[] = [];
    return columns;
  }, []);

  return (
    <Layout>
      <LayoutBreadCrumb
        crumbs={[
          {
            name: "User Game Tag",
            href: "/admin/user-game-tag",
            isCurrentPage: true,
          },
        ]}
      />
      <div className="flex flex-col gap-2">
        <LayoutHeader
          title="User's Game Tag"
          description="View user's game tags"
        />
        <FilterContainer></FilterContainer>
      </div>
    </Layout>
  );
}
