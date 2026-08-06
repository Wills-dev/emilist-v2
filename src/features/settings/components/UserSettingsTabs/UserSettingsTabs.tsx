import { MoreVertical } from "lucide-react";
import { userSettingsTabs } from "../../constants";

interface UserSettingsTabsProps {
  activeTab: (typeof userSettingsTabs)[number]["id"];
  onChange: (tab: (typeof userSettingsTabs)[number]["id"]) => void;
}

const UserSettingsTabs = ({ activeTab, onChange }: UserSettingsTabsProps) => (
  <div className="flex items-center justify-between gap-4 py-6 px-6 border-b border-[#F1F2F9] max-sm:px-3">
    <div className="no-scrollbar flex max-w-full items-center overflow-x-auto rounded-full bg-[#F7F7F7] p-1">
      {userSettingsTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          aria-current={activeTab === tab.id ? "page" : undefined}
          onClick={() => onChange(tab.id)}
          className={`shrink-0 rounded-full px-5 py-2 text-sm transition-colors ${
            activeTab === tab.id
              ? "bg-white font-medium text-[#303632] shadow-sm"
              : "text-[#737774] hover:text-[#303632]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
    <button
      type="button"
      aria-label="More settings options"
      className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#ECECEC] text-[#737774]"
    >
      <MoreVertical className="size-5" />
    </button>
  </div>
);

export default UserSettingsTabs;
