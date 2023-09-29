function Button({ children, action, payload, disabled }) {
    return (
        <button
            disabled={disabled}
            className={`bg-green-400 text-gray-900 py-2 px-4 text-center outline-none border-none rounded-md ml-auto mt-2 text-xl font-semibold hover:bg-orange-600 md:text-[1.75rem] md:px-6 md:py-4 ${
                payload ? payload : ""
            } ${disabled ? "bg-slate-400 cursor-not-allowed" : ""}`}
            onClick={action}
        >
            {children}
        </button>
    );
}

export default Button;
