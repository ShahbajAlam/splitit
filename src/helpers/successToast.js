import toast from "react-hot-toast";

const style = {
    fontSize: "1.1rem",
    textAlign: "center",
    borderRadius: "2rem",
    fontWeight: 600,
    padding: "0.75rem 1rem",
};

const successToast = (message, id, icon) => {
    toast.success(message, {
        position: "top-center",
        duration: 3000,
        style,
        id,
        icon,
    });
};

export { successToast };
