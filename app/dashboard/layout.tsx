import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex bg-blue-50">
            <Sidebar />

            <div className="flex-1">{children}</div>
        </div>
    );
}