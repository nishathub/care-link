import { create } from "zustand";

const useUserStore = create((set) => ({
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
}));

export default useUserStore;
