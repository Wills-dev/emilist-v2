import { createPageMetadata } from "@/lib/seo/metadata";
import LoginSkeleton from "@/components/organisms/LoginWrapper/LoginSkeleton/LoginSkeleton";
import { Suspense } from "react";
import LoginWrapper from "@/components/organisms/LoginWrapper/LoginWrapper";

export const metadata = createPageMetadata({"title": "Log In", "description": "Log In on Emilist.", "index": false, "path": "/auth/login"});

const LoginPage = () => (
  <Suspense fallback={<LoginSkeleton />}>
    <LoginWrapper />
  </Suspense>
);

export default LoginPage;
