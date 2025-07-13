import classNames from "classnames";

export const Button = ({ children, className, isTransparent, ...rest }) => {
    return (
        <button
            {...rest}
            className={classNames(
                isTransparent ? "bg-transparent opacity-50" : "bg-white/80 dark:bg-black/90",
                "rounded-full",
                "size-12 flex items-center justify-center",
                "hover:bg-gray-200 transition-colors",
                className)}>
            {children}
        </button>
    )
}