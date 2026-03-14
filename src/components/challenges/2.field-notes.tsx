import React, { useState, useRef, FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Notes {
  id: number;
  text: string;
}

const initialNotes: Notes[] = [
  {
    id: 1,
    text: "Components encapsulate both the visual representation of a particular piece of UI as well as the state and logic that goes along with it.",
  },
  {
    id: 2,
    text: "The same intuition you have about creating and composing together functions can directly apply to creating and composing components. However, instead of composing functions together to get some value, you can compose components together to get some UI.",
  },
  {
    id: 3,
    text: "JSX combines the power and expressiveness of JavaScript with the readability and accessibility of HTML",
  },
  {
    id: 4,
    text: "Just like a component enabled the composition and reusability of UI, hooks enabled the composition and reusability of non-visual logic.",
  },
];
const FieldNotes = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Notes[]>(initialNotes);
  const lastNoteRef = useRef<HTMLLIElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    setNotes([...notes, { id: Date.now(), text: note }]);
    setNote("");
    setTimeout(() => {
      lastNoteRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2d2d2d]">
      <article className="p-6 bg-[#2a2a2a] rounded-xl shadow-xl border border-blue-200 w-full max-w-md">
        <h1>Field Notes</h1>

        <div className="pl-4 pr-4 rounded-md">
          <ul className="m-0 p-0 flex flex-col h-64 overflow-auto">
            {notes.map((msg, index) => (
              <li key={msg.id} ref={index === notes.length - 1 ? lastNoteRef : null}>{msg.text}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <Input 
              type="text" 
              name="note" 
              placeholder="Enter your note" 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button type="submit" className="p-6 bg-amber-300">Submit</Button>
          </form>
        </div>
      </article>
    </div>
  );
};

export default FieldNotes;
