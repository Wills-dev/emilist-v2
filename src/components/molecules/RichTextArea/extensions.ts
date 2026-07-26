import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

export const createRichTextExtensions = (placeholder?: string) => [
  StarterKit.configure({
    heading: {
      levels: [2, 3],
    },
  }),
  Placeholder.configure({
    placeholder: placeholder ?? "",
  }),
];
