"use client";

import { EditorContent, useEditor } from "@tiptap/react";

import { createRichTextExtensions } from "@/components/molecules/RichTextArea/extensions";

const RichTextContent = ({
  value,
  className = "",
}: {
  value?: string;
  className?: string;
}) => {
  const editor = useEditor({
    extensions: createRichTextExtensions(),
    content: value || "",
    editable: false,
    immediatelyRender: false,
  });

  if (!value?.trim()) {
    return <p className={className}>No description provided.</p>;
  }

  return (
    <EditorContent
      editor={editor}
      className={`space-y-3 [&_.tiptap]:space-y-3 [&_h2]:font-exo [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#303632] [&_h3]:font-exo [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#303632] [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-[#303632] ${className}`}
    />
  );
};

export default RichTextContent;
