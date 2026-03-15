import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type AccordionContextType = {
  open: string | null;
  setOpen: Dispatch<SetStateAction<string | null>>;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

type AccordionProps = {
  children: ReactNode;
};

const Accordion = ({ children }: AccordionProps) => {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <AccordionContext.Provider value={{ open, setOpen }}>
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg bg-white shadow-lg">
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

type AccordionItemProps = {
  value: string;
  children: ReactNode;
};

function AccordionItem({ value, children }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0 bg-white transition-colors duration-200">
      {children}
    </div>
  );
}

type AccordionTriggerProps = {
  children: ReactNode;
  value: string;
};

function AccordionTrigger({ children, value }: AccordionTriggerProps) {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionTrigger must be used within Accordion");
  const { open, setOpen } = context;
  const handleClick = () => {
    if (open === value) {
      setOpen(null);
    } else {
      setOpen(value);
    }
  };

  const isOpen = open === value;
  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-between text-left px-4 py-3 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-t-lg
        ${isOpen ? "bg-blue-100 text-blue-700" : "bg-white text-gray-800 hover:bg-blue-50"}`}>
      <span>{children}</span>
      <svg
        className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-500" : "rotate-0 text-gray-400"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
}

type AccordionContentProps = {
  children: ReactNode;
  value: string;
};

function AccordionContent({ children, value }: AccordionContentProps) {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionContent must be used within Accordion");
  const { open } = context;

  if (open !== value) {
    return null;
  }

  return (
    <div className="p-4 bg-blue-50 text-gray-700 animate-fade-in border-t border-gray-200">
      {children}
    </div>
  );
}

export default function AccordionDemo() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 drop-shadow">
        Accordion Demo
      </h1>
      <Accordion>
        <AccordionItem value="item1">
          <AccordionTrigger value="item1">Item 1</AccordionTrigger>
          <AccordionContent value="item1">
            This is the content for Item 1. It will be shown when Item 1 is
            clicked.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item2">
          <AccordionTrigger value="item2">Item 2</AccordionTrigger>
          <AccordionContent value="item2">
            This is the content for Item 2. It will be shown when Item 2 is
            clicked.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item3">
          <AccordionTrigger value="item3">Item 3</AccordionTrigger>
          <AccordionContent value="item3">
            This is the content for Item 3. It will be shown when Item 3 is
            clicked.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
// Fade-in animation for content
// Add this style globally or use a CSS-in-JS solution if needed
// Here is a quick inline style for demonstration:
const style = document.createElement("style");
style.innerHTML = `
  .animate-fade-in {
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
if (
  typeof window !== "undefined" &&
  !document.getElementById("accordion-fade-style")
) {
  style.id = "accordion-fade-style";
  document.head.appendChild(style);
}
