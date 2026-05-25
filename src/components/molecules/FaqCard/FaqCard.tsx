import ArrowUp from "@/components/atoms/icons/ArrowUp";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";

const FaqCard = ({
  index,
  id,
  question,
  answer,
  toggleFaq,
  openId,
}: {
  index: number;
  id: number;
  question: string;
  answer: string;
  openId: number | null;
  toggleFaq: (id: number) => void;
}) => {
  const isActive = openId === id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className={`sm:p-6 max-sm:py-3 max-sm:px-3 rounded-2xl overflow-hidden ${isActive ? "bg-[#155231]" : "bg-linear-to-b from-0% from-[#FFFFFF] to-100% to-[#FBFBFB]"}`}
    >
      <div className="space-y-2.75" onClick={() => toggleFaq(id)}>
        <div className="flex items-center justify-between">
          <div
            className={`${isActive ? "text-white" : "text-[#5E625F]"} sm:text-[24px]`}
          >
            <ArrowUp />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 shrink-0"
          >
            {isActive ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Plus className="w-4 h-4 text-[#A0A3BD]" />
            )}
          </motion.div>
        </div>
        <h3
          className={`max-sm:text-sm font-exo font-medium leading-6 ${isActive ? "text-[#88EDB3]" : ""}`}
        >
          {question}
        </h3>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pt-2"
          >
            <p className="text-white text-xs">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqCard;
