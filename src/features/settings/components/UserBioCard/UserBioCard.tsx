import RichTextContent from "@/components/atoms/RichTextContent/RichTextContent";
import RichTextArea from "@/components/molecules/RichTextArea/RichTextArea";
import SettingsEditActions from "../SettingsEditActions/SettingsEditActions";

interface UserBioCardProps {
  value: string;
  editing: boolean;
  loading: boolean;
  onChange: (value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const UserBioCard = ({
  value,
  editing,
  loading,
  onChange,
  onEdit,
  onSave,
  onCancel,
}: UserBioCardProps) => (
  <section className="flex min-h-64 flex-col rounded-lg bg-[#F9F9F9] p-4">
    <div className="mb-4 flex items-center justify-between gap-2">
      <h2 className="font-exo font-medium text-[#474C48]">Bio</h2>
      {!editing && (
        <SettingsEditActions
          editing={false}
          loading={loading}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
    </div>
    {editing ? (
      <RichTextArea
        id="settings-bio"
        name="bio"
        value={value}
        onChange={onChange}
        placeholder="Write a short description about yourself and what you do"
        ariaLabel="Bio"
        className="flex-1 bg-white"
      />
    ) : (
      <div className="min-h-44 flex-1 rounded-lg bg-white p-4 text-[#737774]">
        <RichTextContent value={value} className="leading-6 text-[#737774]" />
      </div>
    )}
    {editing && (
      <SettingsEditActions
        editing
        loading={loading}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
        className="mt-4 justify-end"
      />
    )}
  </section>
);

export default UserBioCard;
