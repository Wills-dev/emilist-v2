import OptionToggle from "@/components/molecules/OptionToggle/OptionToggle";

export type LeadsCategory = "jobs" | "experts";

const categoryOptions = [
  { value: "jobs" as const, label: "Jobs" },
  { value: "experts" as const, label: "Experts" },
];

const LeadsCategoryToggle = ({
  value,
  onChange,
}: {
  value: LeadsCategory;
  onChange: (value: LeadsCategory) => void;
}) => (
  <div className="w-fit rounded-lg px-4">
    <OptionToggle
      name="leads-category"
      ariaLabel="Leads category"
      options={categoryOptions}
      value={value}
      onChange={onChange}
      className="text-white"
    />
  </div>
);

export default LeadsCategoryToggle;
