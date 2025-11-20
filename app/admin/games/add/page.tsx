"use client";

import {
  LayoutBreadCrumb,
  LayoutHeader,
  Layout,
  Container,
} from "@/components/layouts";

export default function AddGame() {
  return (
    <Layout>
      <LayoutBreadCrumb
        crumbs={[
          { name: "Games", link: "/admin/games" },
          {
            name: "Add Game",
            link: "/admin/games/add",
            isCurrentPage: true,
          },
        ]}
      />
      <LayoutHeader
        title="Add Game"
        description="Add a new game to your collection."
      />
      <Container></Container>
    </Layout>
  );
}
