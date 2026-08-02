"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import RichTextToolbar from "./RichTextToolbar";
import { createRichTextExtensions } from "./extensions";

interface RichTextAreaProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
}

const RichTextArea = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  className = "",
  ariaLabel = "Material description",
}: RichTextAreaProps) => {
  const editor = useEditor({
    extensions: createRichTextExtensions(placeholder),
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id: id ?? "",
        "aria-label": ariaLabel,
        class:
          "min-h-35 px-3 py-2 text-base outline-none [&_h2]:font-exo [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:font-exo [&_h3]:text-base [&_h3]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_p]:min-h-5",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.isEmpty ? "" : currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor || editor.getHTML() === value) return;
    editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);

  if (!editor) {
    return <div className="h-44 animate-pulse rounded-[10px] bg-[#ECECEC]" />;
  }

  return (
    <div
      className={`overflow-hidden rounded-[10px] border border-gray-200 bg-[#ECECEC] text-[#737774] transition-all duration-300 focus-within:border-[#25C269] ${className}`}
    >
      <input type="hidden" name={name} value={value} />
      <RichTextToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="[&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none [&_.tiptap_p.is-editor-empty:first-child::before]:float-left [&_.tiptap_p.is-editor-empty:first-child::before]:h-0 [&_.tiptap_p.is-editor-empty:first-child::before]:text-gray-400 [&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]"
      />
    </div>
  );
};

export default RichTextArea;
