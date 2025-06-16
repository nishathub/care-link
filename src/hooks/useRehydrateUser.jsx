"use client";
import { useEffect } from "react";
import axios from "axios";
import useUserStore from "@/lib/zustand/userStore";

export const useRehydrateUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setUserLoading = useUserStore((state) => state.setUserLoading);

  useEffect(() => {
    setUserLoading(true);

    const fetchUser = async () => {
      try {
        const userRes = await axios.get(
          `${process.env.NEXT_PUBLIC_CareLinkAPI}/auth/me`,
          {
            withCredentials: true,
          }
        );
        const { user, isAuthenticated } = userRes.data;
        if (isAuthenticated === false || !user) {
          setUser(null);
        } else {
          setUser(user);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [setUser]);
};
