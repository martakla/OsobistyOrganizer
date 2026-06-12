"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

export default function Home() {
    const router = useRouter();

    return (
        <main className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white p-10 rounded-2xl shadow-md text-center flex flex-col gap-4 w-[400px]">
                <h1 className="text-2xl font-semibold text-blue-900">
                    Witaj w aplikacji do zadań
                </h1>

                <p className="text-blue-700">
                    Zaloguj się lub zarejestruj, aby zacząć.
                </p>

                <div className="flex flex-col gap-2 mt-4">
                    <Button onClick={() => router.push("/login")}>
                        Zaloguj się
                    </Button>

                    <Button
                        variant="light"
                        onClick={() => router.push("/register")}
                    >
                        Zarejestruj się
                    </Button>
                </div>
            </div>
        </main>
    );
}