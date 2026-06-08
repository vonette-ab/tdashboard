
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login"); // redirect if not logged in
    }
  }, []);

  if (!isAuthenticated()) return null; // prevents flash of protected content

  return <>{children}</>;
}