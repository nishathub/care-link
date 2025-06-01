"use client";

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/lib/zustand/userStore";

const useAxiosSecure = () => {
  const router = useRouter();
  const { user, logout, isUserLoading } = useUserStore(); // Zustand

  // Axios instance with cookie support
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CareLinkAPI,
    withCredentials: true,
  });

  useEffect(() => {
    if (isUserLoading || !user) return;

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err?.response?.status ?? null;

        if (status === 401 || status === 403) {
        //   logout();
          alert("Unauthorize Access!");
          router.push("/login");
        } else {
          alert("Something went wrong.");
        }

        return Promise.reject(err);
      }
    );

    //Cleanup
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [isUserLoading, user, router]);

  return axiosInstance;
};

export default useAxiosSecure;
