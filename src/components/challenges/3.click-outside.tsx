import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Info } from "lucide-react";

const ClickOutside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent | PointerEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      // Using pointerdown for better mobile support and responsiveness
      document.addEventListener("pointerdown", handleClickOutside);
      return () => {
        document.removeEventListener("pointerdown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Click Outside Challenge</h1>
          <p className="text-muted-foreground max-w-md">
            Testing a custom modal implementation where clicking anywhere outside the card will dismiss it.
          </p>
        </div>
        
        <Button
          onClick={handleOpen}
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all"
        >
          Open Modal
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-200">
          <div 
            ref={modalRef}
            className="w-full max-w-sm animate-in fade-in zoom-in duration-200"
          >
            <Card className="shadow-2xl border-primary/20">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Interactive Modal</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground leading-relaxed">
                  This dialog is perfectly centered. Go ahead and click the backdrop or the button below to close it.
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-3 pt-6">
                <Button
                  variant="outline"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleClose}
                >
                  Got it
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickOutside;
