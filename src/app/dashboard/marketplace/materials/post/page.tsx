import PostMaterialForm from "@/components/molecules/forms/PostMaterialForm/PostMaterialForm";
import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Post a Material",
  description: "List materials for sale on Emilist.",
  index: false,
});

export default function PostMaterialPage() {
  return (
    <CenteredFormLayout>
      <PostMaterialForm dashboard />
    </CenteredFormLayout>
  );
}
