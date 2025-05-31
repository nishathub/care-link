import { create } from "zustand";

const useUserStore = create((set) => ({
  isUserLoading: false,
  user: null,
  isAdmin: false,
  isChief: false,

  setUser: (user) =>
    set({
      user,
      isAdmin: user?.role === "Admin",
      isChief: user?.rank === "Chief",
    }),
  logout: () => set({ user: null, isAdmin: false, isChief: false }),
  setUserLoading: (loading) => set({ isUserLoading: loading }),
}));

export default useUserStore;
