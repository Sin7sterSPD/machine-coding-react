import React, { createContext, useContext, useState, ReactNode } from "react";

interface TabContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

interface TabProviderProps {
  children: ReactNode;
  defaultValue: string;
}

const TabProvider = ({ children, defaultValue }: TabProviderProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultValue);
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

interface TabTriggerProps {
  children: ReactNode;
  value: string;
}

function TabTrigger({ children, value }: TabTriggerProps) {
  const context = useContext(TabContext);
  if (!context) throw new Error("TabTrigger must be used within a TabProvider");
  const { activeTab, setActiveTab } = context;
  const handleSetActiveTab = () => {
    setActiveTab(value);
  };
  return (
    <button
      className={
        activeTab === value
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700"
      }
      onClick={handleSetActiveTab}>
      {children}
    </button>
  );
}

interface TabContentProps {
  children: ReactNode;
  value: string;
}

function TabContent({ children, value }: TabContentProps) {
  const context = useContext(TabContext);
  if (!context) throw new Error("TabContent must be used within a TabProvider");
  const { activeTab } = context;
  return (
    <div style={{ display: activeTab === value ? "block" : "none" }}>
      {children}
    </div>
  );
}

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

const Tabs = ({ defaultValue, children }: TabsProps) => {
  return <TabProvider defaultValue={defaultValue}>{children}</TabProvider>;
};

Tabs.Trigger = TabTrigger;
Tabs.Content = TabContent;

export default Tabs;
