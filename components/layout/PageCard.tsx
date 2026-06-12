import type { ReactNode } from "react";

type PageCardProps = {
    children: ReactNode;
    wide?: boolean;
    className?: string;
};

export default function PageCard({
                                     children,
                                     wide = false,
                                     className = "",
                                 }: PageCardProps) {
    return (
        <main className="min-h-screen bg-blue-50 p-6">
            <div
                className={`mx-auto bg-white p-6 rounded-2xl shadow-md ${
                    wide ? "max-w-2xl" : "max-w-xl"
                } ${className}`}
            >
                {children}
            </div>
        </main>
    );
}