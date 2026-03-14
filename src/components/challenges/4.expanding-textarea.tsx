import React, { useRef } from "react";

const ExpandingTextArea = () => {
  const [text, setText] = React.useState("");
  const textref = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textref.current) {
      textref.current.style.height = "inherit";
      const scrollHeight = textref.current.scrollHeight;
      textref.current.style.height = `${scrollHeight}px`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white py-8 px-2">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700 text-center">
          Expanding TextArea
        </h1>
        <label
          htmlFor="expanding-textarea"
          className="block text-base font-medium text-gray-700 mb-2">
          Enter your text:
        </label>
        <textarea
          id="expanding-textarea"
          className="transition-all duration-150 block w-full rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 resize-none overflow-hidden px-4 py-3 text-gray-800 text-base placeholder-gray-400"
          rows={1}
          value={text}
          ref={textref}
          onChange={handleChange}
          placeholder="Type something..."
        />
      </div>
    </div>
  );
};

export default ExpandingTextArea;
