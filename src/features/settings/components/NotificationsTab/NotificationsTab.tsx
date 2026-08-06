"use client";

import { useNotificationSettings } from "../../hooks/useNotificationSettings";
import NotificationPreferenceRow from "../NotificationPreferenceRow/NotificationPreferenceRow";

const NotificationsTab = () => {
  const preferences = useNotificationSettings();

  return (
    <section className="w-full bg-white p-2 max-sm:p-0">
      <div className="rounded-lg bg-[#F4F7F5] p-2 max-sm:p-3">
        <div className="min-h-128 rounded-lg bg-white px-4 max-sm:min-h-80 max-sm:px-2">
          <NotificationPreferenceRow
            label="Allow new message notification"
            checked={preferences.allowNewMessages}
            onCheckedChange={preferences.setAllowNewMessages}
          />
          <NotificationPreferenceRow
            label="Allow email notification"
            checked={preferences.allowEmail}
            onCheckedChange={preferences.setAllowEmail}
          />
        </div>
      </div>
    </section>
  );
};

export default NotificationsTab;
