import { Suspense } from "react";

import LoginWrapper from "@/components/organisms/LoginWrapper/LoginWrapper";

const LoginPage = () => (
  <Suspense fallback={<div className="min-h-screen bg-white" />}>
    <LoginWrapper />
  </Suspense>
);

export default LoginPage;
