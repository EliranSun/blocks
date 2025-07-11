import classNames from "classnames";

export const Button = ({ children, className, ...rest }) => {
    return (
        <button
            {...rest}
            className={classNames("bg-white/50 rounded-full",
                "size-12 flex items-center justify-center hover:bg-gray-200 transition-colors", className)}>
            {children}
        </button>
    )
}