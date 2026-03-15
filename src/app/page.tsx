"use client";

import Image from "next/image";
import { ThemeButton } from "@/components/challenges/7.theme-toggle";
import {
  TabsTrigger,
  Tabs,
  TabsContent,
  TabsList,
} from "@/components/challenges/5.tabs";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to React Coding Challenges!
      </h1>
      <ThemeButton />
      <p className="mt-4 text-lg text-gray-600">
        Explore various React coding challenges and improve your skills.
      </p>

      <TabsDemo />
    </div>
  );
}

const TabsDemo = () => {
  return (
    <div>
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Profile</TabsTrigger>
          <TabsTrigger value="tab2">Settings</TabsTrigger>
          <TabsTrigger value="tab3">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="tab1">Profile information goes here</TabsContent>

        <TabsContent value="tab2">Settings page content</TabsContent>

        <TabsContent value="tab3">Billing and subscription details</TabsContent>
      </Tabs>
    </div>
  );
};
