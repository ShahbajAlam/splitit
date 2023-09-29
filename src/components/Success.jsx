import Lottie from "lottie-react";
import data from "../assets/success.json";
import { useContext } from "react";
import Context from "../context/context";
import "../index.css";

function Success() {
    const { setState } = useContext(Context);

    const handleComplete = () => {
        setState((state) => ({ ...state, status: "pdf" }));
    };

    return (
        <Lottie
            animationData={data}
            autoplay
            loop={false}
            onComplete={handleComplete}
            style={{
                width: "20rem",
                height: "20rem",
            }}
        />
    );
}

export default Success;
