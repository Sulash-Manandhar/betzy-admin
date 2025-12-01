"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX, useState } from "react";
import ReferralTable from "./ReferralTable";
import { Container } from "../layouts";

type TabsValue = "referrals" | "password";

const AVAILABLE_TAB: TabsValue[] = ["referrals", "password"];

const TAB_LIST: Record<TabsValue, JSX.Element> = {
  referrals: <ReferralTable />,
  password: <div>Password</div>,
};

export default function UserTabs() {
  const [activeTab, setActiveTab] = useState<TabsValue>("referrals");

  return (
    <Tabs value={activeTab} onValueChange={(e) => setActiveTab(e as TabsValue)}>
      <Container>
        <TabsList>
          {AVAILABLE_TAB.map((item) => (
            <TabsTrigger key={item} value={item} className="capitalize">
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
      </Container>
      {AVAILABLE_TAB.map((item) => (
        <TabsContent key={item} value={item}>
          {TAB_LIST[item]}
        </TabsContent>
      ))}
    </Tabs>
  );
}
