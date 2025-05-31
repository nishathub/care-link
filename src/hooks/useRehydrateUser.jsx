"use client";
import { useEffect } from "react";
import axios from "axios";
import useUserStore from "@/lib/zustand/userStore";

export const useRehydrateUser = () => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get(
          `${process.env.NEXT_PUBLIC_CareLinkAPI}/auth/me`,
          {
            withCredentials: true,
          }
        );
        const { user } = userRes.data;
        // set user to zustand
        setUser(user);
      } catch (err) {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, [setUser]);
};
