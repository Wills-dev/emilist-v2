import Button from "@/components/atoms/Button/Button";

interface SettingsEditActionsProps {
  editing: boolean;
  loading?: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  className?: string;
}

const SettingsEditActions = ({
  editing,
  loading = false,
  onEdit,
  onSave,
  onCancel,
  className = "",
}: SettingsEditActionsProps) => {
  if (!editing) {
    return (
      <Button
        variant="secondary"
        onClick={onEdit}
        className={`h-8 px-3! text-xs ${className}`}
      >
        Edit
      </Button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="default"
        onClick={onCancel}
        className="h-8 px-3! text-xs"
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={onSave}
        loading={loading}
        className="h-8 px-3! text-xs"
      >
        Save
      </Button>
    </div>
  );
};

export default SettingsEditActions;
