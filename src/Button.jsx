import classNames from "classnames";

export const Button = ({ children, className, ...rest }) => {
    return (
        <button
            {...rest}
            className={classNames("text-black bg-white rounded-full",
                "size-10 flex items-center justify-center hover:bg-gray-200 transition-colors", className)}>
            {children}
        </button>
    )
}