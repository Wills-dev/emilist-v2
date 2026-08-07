"use client";

import { useState } from "react";

import MessageIcon from "@/components/atoms/icons/MessageIcon";
import NotificationIcon from "@/components/atoms/icons/NotificationIcon";
import WarningIcon from "@/components/atoms/icons/WarningIcon";
import NavIconWrapper from "@/components/atoms/NavIconWrapper/NavIconWrapper";
import NotificationModal from "@/features/notifications/components/NotificationModal/NotificationModal";
import { testNotifications } from "@/features/notifications/constants/testNotifications";
import { routes } from "@/lib/helpers/routes";

const DashboardNavIconWrap = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <NavIconWrapper>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 11.6328H12.01M16 5.63281V3.63281C16 3.10238 15.7893 2.59367 15.4142 2.2186C15.0391 1.84353 14.5304 1.63281 14 1.63281H10C9.46957 1.63281 8.96086 1.84353 8.58579 2.2186C8.21071 2.59367 8 3.10238 8 3.63281V5.63281M22 12.6328C19.0328 14.5918 15.5555 15.6361 12 15.6361C8.44445 15.6361 4.96721 14.5918 2 12.6328M4 5.63281H20C21.1046 5.63281 22 6.52824 22 7.63281V17.6328C22 18.7374 21.1046 19.6328 20 19.6328H4C2.89543 19.6328 2 18.7374 2 17.6328V7.63281C2 6.52824 2.89543 5.63281 4 5.63281Z"
            stroke="#303632"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </NavIconWrapper>
      <NavIconWrapper
        href={routes.dashboardLinks.messages}
        ariaLabel="Open messages"
      >
        <MessageIcon />
      </NavIconWrapper>
      <NavIconWrapper>
        <WarningIcon />
      </NavIconWrapper>
      <NavIconWrapper onClick={() => setNotificationsOpen(true)}>
        <NotificationIcon />
      </NavIconWrapper>
      <NotificationModal
        open={notificationsOpen}
        onClose={setNotificationsOpen}
        initialNotifications={testNotifications}
      />
    </div>
  );
};

export default DashboardNavIconWrap;
