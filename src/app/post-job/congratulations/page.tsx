import type { Metadata } from "next";

import CongratsContent from "@/components/molecules/CongratsContent/CongratsContent";
import FormNav from "@/components/molecules/FormNav/FormNav";
import { routes } from "@/lib/helpers/routes";

export const metadata: Metadata = {
  title: "Job posted",
};

const PostJobCongratulationsPage = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      <FormNav />
      <CongratsContent
        title="Your job has been posted successfully"
        desc="Keep an eye on your dashboard for updates and next steps for your job."
        href={routes.dashboardLinks.jobs}
      />
    </div>
  );
};

export default PostJobCongratulationsPage;
