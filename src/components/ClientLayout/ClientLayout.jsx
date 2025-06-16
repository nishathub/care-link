"use client";
import { useRehydrateUser } from "@/hooks/useRehydrateUser";

export default function ClientLayout({ children }) {
  useRehydrateUser();
  return <>{children}</>;
}
