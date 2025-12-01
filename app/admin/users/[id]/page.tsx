"use client";
import { Container, Layout, LayoutBreadCrumb } from "@/components/layouts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/hooks/queries/users";
import { env } from "@/lib/env";
import { NextUrlType } from "@/lib/types";
import { useParams } from "next/navigation";
import UserTabs from "@/components/user/UserTabs";

export default function UserDashboard() {
  const params = useParams<{ id: string }>();
  const id = params.id ? Number(params.id) : null;
  const { data: user, isLoading } = useUser(id);
  console.log(user);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Container>User not found</Container>;
  }

  return (
    <Layout>
      <LayoutBreadCrumb
        crumbs={[
          {
            name: "User",
            href: "/admin/users",
          },
          {
            name: user?.firstName + " " + user?.lastName,
            href: `/admin/users/${id}` as unknown as NextUrlType,
            isCurrentPage: true,
          },
        ]}
      />
      <Container className="flex flex-col lg:flex-row gap-4">
        <Avatar className="size-40">
          <AvatarImage
            src={`${env.IMAGE_URL}/${user?.profileUrl}`}
            alt={user?.firstName + " " + user?.lastName}
          />
          <AvatarFallback className="flex flex-col gap-1 text-xs overflow-hidden">
            <span>{user?.firstName?.[0] + user?.lastName?.[0]}</span>
          </AvatarFallback>
        </Avatar>
        <div className="grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 justify-between w-full gap-4">
          <div>
            <span className="text-sm font-medium">First Name</span>
            <p className="text-sm">{user?.firstName}</p>
          </div>
          <div>
            <span className="text-sm font-medium">Last Name</span>
            <p className="text-sm">{user?.lastName}</p>
          </div>
          <div>
            <span className="text-sm font-medium">Email Address</span>
            <p className="text-sm">{user?.email}</p>
          </div>
          <div>
            <span className="text-sm font-medium ">Clerk Id</span>
            <p className="text-sm  truncate">{user?.clerkId}</p>
          </div>
          <div>
            <span className="text-sm font-medium">Membership Level</span>
            <p className="text-sm">{user?.membership?.name ?? "-"}</p>
          </div>
          <div>
            <span className="text-sm font-medium">Referral Code</span>
            <p className="text-sm">{user?.referralCode ?? "-"}</p>
          </div>
          <div>
            <span className="text-sm font-medium">Balance(Betzy coin)</span>
            <p className="text-sm">{user?.balance ?? "0"}</p>
          </div>
          <div>
            <span className="text-sm font-medium">XP</span>
            <p className="text-sm">{user?.xp}XP</p>
          </div>
          <div>
            <span className="text-sm font-medium">Created At</span>
            <p className="text-sm">
              {user?.createdAt
                ? new Date(user?.createdAt).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>
      </Container>

      <UserTabs />
    </Layout>
  );
}
