import React, { useState, useRef, FormEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    setNotes([...notes, { id: Date.now(), text: note }]);
    setNote("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [notes]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-muted">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold tracking-tight">Field Notes</CardTitle>
            <Badge variant="secondary" className="px-3 py-1">
              {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground">
            A place to capture your thoughts and React insights.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <div 
            ref={scrollRef}
            className="h-100 overflow-y-auto p-6 space-y-4 scroll-smooth"
          >
            {notes.map((msg, index) => (
              <div 
                key={msg.id} 
                className="group relative flex flex-col gap-2 rounded-lg border bg-card p-4 transition-all hover:bg-accent/50 hover:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                    {index + 1}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">
                    {new Date(msg.id > 100 ? msg.id : Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  {msg.text}
                </p>
              </div>
            ))}
            {notes.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-sm text-muted-foreground">No notes yet. Start writing below!</p>
              </div>
            )}
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="p-6">
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
            <Input 
              type="text" 
              name="note" 
              placeholder="Write a new note..." 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1"
              autoComplete="off"
            />
            <Button type="submit" disabled={!note.trim()}>
              Add Note
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FieldNotes;
