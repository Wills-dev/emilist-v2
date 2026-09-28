"use client";

import { Bold, Heading3, ListOrdered, Pilcrow } from "lucide-react";
import { Editor } from "@tiptap/react";

const RichTextToolbar = ({ editor }: { editor: Editor }) => {
  const toolClassName =
    "flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C269]";
  const activeClassName = "bg-white text-[#18A154] shadow-sm";

  return (
    <div
      className="flex flex-wrap items-center gap-1 border-b border-gray-300 px-2 py-1.5"
      role="toolbar"
      aria-label="Description formatting"
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        aria-label="Caption"
        aria-pressed={editor.isActive("heading", { level: 3 })}
        className={`${toolClassName} ${
          editor.isActive("heading", { level: 3 }) ? activeClassName : ""
        }`}
      >
        <Heading3 className="size-4" />
        <span className="max-sm:hidden">Caption</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        aria-label="Bold"
        aria-pressed={editor.isActive("bold")}
        className={`${toolClassName} disabled:cursor-not-allowed disabled:opacity-40 ${
          editor.isActive("bold") ? activeClassName : ""
        }`}
      >
        <Bold className="size-4" />
        <span className="max-sm:hidden">Bold</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        aria-label="Paragraph"
        aria-pressed={editor.isActive("paragraph")}
        className={`${toolClassName} ${
          editor.isActive("paragraph") ? activeClassName : ""
        }`}
      >
        <Pilcrow className="size-4" />
        <span className="max-sm:hidden">Paragraph</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Numbered list"
        aria-pressed={editor.isActive("orderedList")}
        className={`${toolClassName} ${
          editor.isActive("orderedList") ? activeClassName : ""
        }`}
      >
        <ListOrdered className="size-4" />
        <span className="max-sm:hidden">Numbered list</span>
      </button>
    </div>
  );
};

export default RichTextToolbar;
