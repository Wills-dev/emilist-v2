"use client";

import Button from "@/components/atoms/Button/Button";
import Label from "@/components/atoms/Label/Label";
import PasswordInput from "@/components/molecules/PasswordInput/PasswordInput";
import { useDeactivateAccount } from "../../hooks/useDeactivateAccount";
import { useSecurityForm } from "../../hooks/useSecurityForm";
import DeactivateAccountModal from "../DeactivateAccountModal/DeactivateAccountModal";

const SecurityTab = () => {
  const { values, updateField, handleChangePassword } = useSecurityForm();
  const deactivateAccount = useDeactivateAccount();

  return (
    <section className="w-full bg-white p-2 max-sm:p-0">
      <div className="rounded-lg bg-[#F4F7F5] p-2 max-sm:p-3">
        <div className="rounded-lg bg-white p-5 max-sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECECEC] pb-5">
            <h2 className="font-exo font-medium text-[#474C48]">
              Change Password
            </h2>
            <div className="flex flex-wrap items-center gap-2 max-sm:w-full">
              <Button
                variant="default"
                onClick={deactivateAccount.openConfirmation}
                className="h-8 text-xs! max-sm:flex-1"
              >
                Deactivate Account
              </Button>
              <Button
                variant="secondary"
                onClick={handleChangePassword}
                className="h-8 text-xs! max-sm:flex-1"
              >
                Change Password
              </Button>
            </div>
          </div>

          <div className="mt-7 space-y-7">
            <div className="space-y-3">
              <Label
                htmlFor="current-password"
                title="Enter current password"
              />
              <PasswordInput
                id="current-password"
                value={values.currentPassword}
                onChange={(event) =>
                  updateField("currentPassword", event.target.value)
                }
                autoComplete="current-password"
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="new-password" title="Enter new password" />
              <PasswordInput
                id="new-password"
                value={values.newPassword}
                onChange={(event) =>
                  updateField("newPassword", event.target.value)
                }
                autoComplete="new-password"
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="confirm-password" title="Confirm new password" />
              <PasswordInput
                id="confirm-password"
                value={values.confirmPassword}
                onChange={(event) =>
                  updateField("confirmPassword", event.target.value)
                }
                autoComplete="new-password"
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>
      </div>
      <DeactivateAccountModal
        open={deactivateAccount.isConfirmationOpen}
        onClose={deactivateAccount.setIsConfirmationOpen}
        onConfirm={deactivateAccount.confirmDeactivation}
        isDeactivating={deactivateAccount.isDeactivating}
      />
    </section>
  );
};

export default SecurityTab;
