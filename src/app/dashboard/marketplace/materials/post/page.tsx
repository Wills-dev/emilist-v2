import Container from "@/components/atoms/Container/Container";
import BackButton from "@/components/atoms/BackButton/BackButton";
import PostMaterialForm from "@/components/molecules/forms/PostMaterialForm/PostMaterialForm";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Post a Material",
  description: "List materials for sale on Emilist.",
  index: false,
});

export default function PostMaterialPage() {
  return (
    <DashboardLayout>
      <Container variant="small">
        <div className="py-6">
          <BackButton isDashboard />
          <div className="mx-auto mt-6 max-w-160 rounded-xl border border-[#F1F2F9] bg-white px-5 sm:px-8">
            <PostMaterialForm dashboard />
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
}
