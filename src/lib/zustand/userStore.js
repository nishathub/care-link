import { create } from "zustand";

const useUserStore = create((set) => ({
  toastText: "",
  isToastActive: false,
  toastType: "",
  isUserLoading: true,
  user: null,
  isAdmin: false,
  isChief: false,

  setUser: (user) =>
    set({
      user,
      isAdmin: user?.role === "admin",
      isChief: user?.rank === "chief",
    }),
  logout: () => set({ user: null, isAdmin: false, isChief: false }),
  setUserLoading: (loading) => set({ isUserLoading: loading }),
  setToastActive: (value) => set({ isToastActive: value }),
  setToastText: (value) => set({ toastText: value }),
  setToastType: (value) => set({ toastType: value }),
}));

export default useUserStore;
