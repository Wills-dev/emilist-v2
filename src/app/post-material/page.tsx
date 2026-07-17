import Container from "@/components/atoms/Container/Container";
import FormNav from "@/components/molecules/FormNav/FormNav";
import PostMaterialForm from "@/components/molecules/forms/PostMaterialForm/PostMaterialForm";

const PostMaterialPage = () => {
  return (
    <div className="min-h-screen h-screen w-full flex flex-col relative">
      <div className="w-full border-b border-[#E5E5E5] bg-white absolute top-0 z-50 left-0 right-0 ">
        <FormNav />
      </div>
      <Container>
        <div className="flex justify-center">
          <div className="max-w-140.25 w-full">
            <PostMaterialForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PostMaterialPage;
