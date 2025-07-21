"use client";

import useUserStore from "@/lib/zustand/userStore";

export const CustomAlert = ({alertText, alertType, duration = 1500}) => {
  const setToastActive = useUserStore.getState().setToastActive;
  const setToastText = useUserStore.getState().setToastText;
  const setToastType = useUserStore.getState().setToastType;

  setToastText(alertText);
  setToastActive(true);
  setToastType(alertType);
  setTimeout(() => {
    setToastActive(false);
  }, duration);
};
