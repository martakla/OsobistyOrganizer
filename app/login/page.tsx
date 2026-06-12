"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/user";
import Button from "@/components/ui/button";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = loginUser(email, password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        setError("");
        router.push("/dashboard");
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md flex flex-col gap-4"
            >
                <div className="text-center mb-2">
                    <h2 className="text-xl font-semibold text-blue-900">
                        Logowanie
                    </h2>

                    <p className="text-sm text-blue-500 mt-1">
                        Zaloguj się do OsobistyOrganizer
                    </p>
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-blue-100 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-blue-100 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <Button type="submit">Zaloguj się</Button>

                {error && (
                    <p className="text-sm text-rose-500 text-center">
                        {error}
                    </p>
                )}
            </form>
        </main>
    );
}