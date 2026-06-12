import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "light" | "danger" | "ghost";
};

export default function Button({
                                   children,
                                   variant = "primary",
                                   className = "",
                                   type = "button",
                                   ...props
                               }: ButtonProps) {
    const base =
        "px-4 py-2 rounded-xl text-sm font-medium transition duration-200 active:scale-95";

    const variants = {
        primary: "bg-blue-200 text-blue-900 hover:bg-blue-300",
        light: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        danger: "bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600",
        ghost: "bg-white text-blue-600 ring-1 ring-blue-100 hover:bg-blue-50",
    };

    return (
        <button
            type={type}
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}