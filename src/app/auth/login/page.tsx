import LoginSkeleton from "@/components/organisms/LoginWrapper/LoginSkeleton/LoginSkeleton";
import { Suspense } from "react";

import LoginWrapper from "@/components/organisms/LoginWrapper/LoginWrapper";

const LoginPage = () => (
  <Suspense fallback={<LoginSkeleton />}>
    <LoginWrapper />
  </Suspense>
);

export default LoginPage;
