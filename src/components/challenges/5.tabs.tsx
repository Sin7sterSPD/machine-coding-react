// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface TabContextType {
//   activeTab: string;
//   setActiveTab: (value: string) => void;
// }

// const TabContext = createContext<TabContextType | undefined>(undefined);

// interface TabProviderProps {
//   children: ReactNode;
//   defaultValue: string;
// }

// const TabProvider = ({ children, defaultValue }: TabProviderProps) => {
//   const [activeTab, setActiveTab] = useState<string>(defaultValue);
//   return (
//     <TabContext.Provider value={{ activeTab, setActiveTab }}>
//       {children}
//     </TabContext.Provider>
//   );
// };

// interface TabTriggerProps {
//   children: ReactNode;
//   value: string;
// }

// function TabTrigger({ children, value }: TabTriggerProps) {
//   const context = useContext(TabContext);
//   if (!context) throw new Error("TabTrigger must be used within a TabProvider");
//   const { activeTab, setActiveTab } = context;
//   const handleSetActiveTab = () => {
//     setActiveTab(value);
//   };
//   return (
//     <button
//       className={
//         activeTab === value
//           ? "bg-blue-500 text-white"
//           : "bg-gray-200 text-gray-700"
//       }
//       onClick={handleSetActiveTab}>
//       {children}
//     </button>
//   );
// }

// interface TabContentProps {
//   children: ReactNode;
//   value: string;
// }

// function TabContent({ children, value }: TabContentProps) {
//   const context = useContext(TabContext);
//   if (!context) throw new Error("TabContent must be used within a TabProvider");
//   const { activeTab } = context;
//   return (
//     <div style={{ display: activeTab === value ? "block" : "none" }}>
//       {children}
//     </div>
//   );
// }

// interface TabsProps {
//   defaultValue: string;
//   children: ReactNode;
// }

// const Tabs = ({ defaultValue, children }: TabsProps) => {
//   return <TabProvider defaultValue={defaultValue}>{children}</TabProvider>;
// };

// Tabs.Trigger = TabTrigger;
// Tabs.Content = TabContent;

// export default Tabs;
"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface TabcontextType {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

interface TabContextProps {
  children: ReactNode;
  defaultValue: string;
}

interface TabTriggerProps {
  value: string;
  children: ReactNode;
}
const TabContext = createContext<TabcontextType | null>(null);

function useTabs() {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("Tabs components must be used inside <Tabs>");
  }

  return context;
}

export function Tabs({ children, defaultValue }: TabContextProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultValue);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function TabsList({ children }: { children: ReactNode }) {
  return <div className="flex gap-2 border-b pb-2 mb-4">{children}</div>;
}

export function TabsTrigger({ value, children }: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = value === activeTab;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded-md transition
      ${
        isActive
          ? "bg-black text-white"
          : "bg-gray-200 text-black hover:bg-gray-300"
      }
    `}>
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabTriggerProps) {
  const { activeTab } = useTabs();

  if (activeTab !== value) return null;

  return <div className="p-4 border rounded-md bg-gray-50">{children}</div>;
}
