const emojiGroups = [
  {
    label: "Smileys & people",
    emojis: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😊",
      "🙂",
      "😉",
      "😍",
      "🥰",
      "😘",
      "😎",
      "🤩",
      "🥳",
      "😢",
      "😭",
      "😔",
      "😕",
      "😮",
      "😴",
      "🤔",
      "🤗",
      "🤭",
      "🙏",
      "👏",
      "👍",
      "👎",
      "👌",
      "💪",
    ],
  },
  {
    label: "Animals & nature",
    emojis: [
      "🐶",
      "🐱",
      "🐭",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐨",
      "🐯",
      "🦁",
      "🐸",
      "🐵",
      "🌸",
      "🌹",
      "🌻",
      "🌞",
    ],
  },
  {
    label: "Food, activities & symbols",
    emojis: [
      "🍎",
      "🍕",
      "🍔",
      "🍰",
      "☕",
      "⚽",
      "🏆",
      "🎉",
      "🎁",
      "❤️",
      "💚",
      "💯",
      "✨",
      "🔥",
      "✅",
      "👑",
    ],
  },
] as const;

const EmojiPicker = ({ onSelect }: { onSelect: (emoji: string) => void }) => (
  <div
    role="dialog"
    aria-label="Choose an emoji"
    className="absolute bottom-[calc(100%+12px)] left-0 z-20 w-[min(320px,calc(100vw-40px))] overflow-hidden rounded-2xl border border-[#E5E9E6] bg-white shadow-xl"
  >
    <div className="border-b border-[#EEF1EF] px-4 py-3">
      <p className="font-exo text-sm font-semibold text-[#303632]">Emojis</p>
    </div>
    <div className="max-h-64 space-y-4 overflow-y-auto p-3">
      {emojiGroups.map((group) => (
        <section key={group.label} aria-label={group.label}>
          <h3 className="mb-2 px-1 text-[10px] font-medium uppercase tracking-wide text-[#8A8D8B]">
            {group.label}
          </h3>
          <div className="grid grid-cols-8 gap-1">
            {group.emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => onSelect(emoji)}
                aria-label={`Insert ${emoji}`}
                className="flex size-8 items-center justify-center rounded-lg text-xl transition-colors hover:bg-[#F0FDF5] focus-visible:outline-2 focus-visible:outline-[#25C269]"
              >
                {emoji}
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

export default EmojiPicker;
