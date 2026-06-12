"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser, getCurrentUserData } from "@/lib/user";
import PageCard from "@/components/layout/PageCard";

export default function Dashboard() {
  const router = useRouter();
  const userData = getCurrentUserData();

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
      <PageCard wide>
        <div className="mb-6 overflow-hidden rounded-2xl bg-blue-50 shadow-sm">
          <Image
              src="/OsobistyOrganizer.png"
              alt="Logo aplikacji OsobistyOrganizer"
              width={900}
              height={675}
              priority
              className="w-full h-auto object-contain"
          />
        </div>

        <div className="mx-auto max-w-xl text-center">
          {userData?.name && (
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Cześć, {userData.name}!
              </h2>
          )}

          <p className="text-blue-700 leading-relaxed mb-4">
            OsobistyOrganizer to aplikacja stworzona po to, aby ułatwić codzienne
            planowanie i organizowanie obowiązków.
          </p>

          <p className="text-blue-700 leading-relaxed">
            Dzięki niej możesz dodawać własne zadania, przeglądać je oraz oznaczać
            jako wykonane. Aplikacja pomaga uporządkować dzień i mieć wszystkie
            ważne sprawy w jednym miejscu.
          </p>
        </div>
      </PageCard>
  );
}