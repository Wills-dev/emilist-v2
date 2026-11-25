import { routes } from "@/lib/helpers/routes";
import { safeAuthDestination } from "@/lib/helpers/authRedirect";
import type { FlowType, User } from "@/store/authStore";

export interface LoginContinuationContext {
  destination: string;
  isModalFlow: boolean;
  pendingFlow: FlowType;
  redirectPath: string | null;
  fromGoogle?: boolean;
}
export const getLoginContinuation = (user: Pick<User, "emailVerified" | "isProfileComplete">, context: LoginContinuationContext) => {
  const destination = safeAuthDestination(context.destination);
  if (!user.emailVerified) return {
    modal: context.isModalFlow ? "verify-otp" as const : null,
    path: context.isModalFlow ? context.fromGoogle ? destination : null : `${routes.verifyEmail}?redirect=${encodeURIComponent(destination)}`,
    clearPending: false,
  };
  const bypassProfile = context.pendingFlow === "register-expert" && (context.isModalFlow || Boolean(context.redirectPath));
  if (!user.isProfileComplete && !bypassProfile) return {
    modal: context.isModalFlow ? "complete-profile" as const : null,
    path: context.isModalFlow ? context.fromGoogle ? destination : null : `${routes.completeProfile}?redirect=${encodeURIComponent(destination)}`,
    clearPending: false,
  };
  const finishDestination = bypassProfile && !context.isModalFlow && context.redirectPath ? safeAuthDestination(context.redirectPath) : destination;
  return {
    modal: null,
    path: context.fromGoogle || !context.isModalFlow ? finishDestination : context.pendingFlow ? null : context.redirectPath ? safeAuthDestination(context.redirectPath) : null,
    clearPending: context.isModalFlow && !context.pendingFlow && Boolean(context.redirectPath),
  };
};
