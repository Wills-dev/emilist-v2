import Switch from "@/components/atoms/Switch/Switch";

interface NotificationPreferenceRowProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const NotificationPreferenceRow = ({
  label,
  checked,
  onCheckedChange,
}: NotificationPreferenceRowProps) => (
  <div className="flex min-h-16 items-center justify-between gap-4 border-b border-[#ECECEC] px-2">
    <span className="font-exo text-[#474C48]">{label}</span>
    <Switch
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={label}
    />
  </div>
);

export default NotificationPreferenceRow;
