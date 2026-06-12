"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/lib/user";
import Button from "@/components/ui/button";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        logoutUser();
        router.push("/");
    };

    const linkBase = "px-4 py-2 rounded-xl transition text-blue-900";
    const active = "bg-blue-300 shadow-sm";
    const inactive = "bg-blue-200 hover:bg-blue-300";

    return (
        <aside className="sticky top-0 h-screen w-64 p-6 bg-blue-100 flex flex-col">
            <h2 className="text-xl font-semibold text-blue-900 mb-6">
                OsobistyOrganizer
            </h2>

            <nav className="flex flex-col gap-3">
                <Link
                    href="/dashboard"
                    className={`${linkBase} ${
                        pathname === "/dashboard" ? active : inactive
                    }`}
                >
                    Strona główna
                </Link>

                <Link
                    href="/dashboard/addtask"
                    className={`${linkBase} ${
                        pathname === "/dashboard/addtask" ? active : inactive
                    }`}
                >
                    Dodaj zadanie
                </Link>

                <Link
                    href="/dashboard/seetask"
                    className={`${linkBase} ${
                        pathname === "/dashboard/seetask" ? active : inactive
                    }`}
                >
                    Zobacz zadania
                </Link>
            </nav>

            <div className="mt-auto">
                <Button variant="light" onClick={handleLogout} className="w-full">
                    Wyloguj
                </Button>
            </div>
        </aside>
    );
}