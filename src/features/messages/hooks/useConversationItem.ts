export const useConversationItem = (id: string, onSelect: (id: string) => void) => {
  const select = () => onSelect(id);
  return { select };
};
