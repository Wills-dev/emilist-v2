import { MoreVertical } from "lucide-react";
import { userSettingsTabs } from "../../constants";
import SegmentedTabs from "@/components/molecules/SegmentedTabs/SegmentedTabs";

interface UserSettingsTabsProps {
  activeTab: (typeof userSettingsTabs)[number]["id"];
  onChange: (tab: (typeof userSettingsTabs)[number]["id"]) => void;
}

const UserSettingsTabs = ({ activeTab, onChange }: UserSettingsTabsProps) => (
  <div className="flex items-center justify-between gap-4 border-b border-[#F1F2F9] px-6 py-6 max-sm:px-3">
    <SegmentedTabs
      options={userSettingsTabs.map((tab) => ({
        label: tab.label,
        value: tab.id,
      }))}
      value={activeTab}
      onChange={onChange}
      ariaLabel="Select user settings section"
    />
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
