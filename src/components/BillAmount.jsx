import { useContext, useRef } from "react";
import Context from "../context/context";
import { Toaster } from "react-hot-toast";
import Button from "./Button";
import { errorToast } from "../helpers/errorToast";

function BillAmount() {
    const billtypeRef = useRef(null);
    const billvalueRef = useRef(null);
    const { setState } = useContext(Context);

    function handleSubmit() {
        if (!billtypeRef.current.value) {
            errorToast(
                "The expense type is not given",
                "billtypeerror",
                <img src="error.png" width={25} height={25} className="mr-2" />
            );
            return;
        }
        if (!billvalueRef.current.value) {
            errorToast(
                "The expense amount is not given",
                "billvalueerror",
                <img src="error.png" width={25} height={25} className="mr-2" />
            );
            return;
        }
        if (billvalueRef.current.value < 0) {
            errorToast(
                "The expense amount can not be negative",
                "billvalueerror",
                <img src="error.png" width={25} height={25} className="mr-2" />
            );
            return;
        }
        setState((state) => ({
            ...state,
            status: "addfriend",
            billtype: billtypeRef.current.value,
            billvalue: billvalueRef.current.value,
        }));
    }

    return (
        <div className="flex flex-col bg-[#22668D] rounded-lg px-5 py-8 w-full md:w-[75%] md:px-10 md:py-10 lg:w-[55%]">
            <Toaster />
            <h1 className="text-gray-200 text-2xl font-sans font-semibold heading text-center mb-6 uppercase md:text-3xl md:mb-10">
                Split the bill among your friends
            </h1>
            <label
                htmlFor="bill-type"
                className="text-xl font-sans font-semibold mb-2 text-gray-200 md:text-[1.75rem] md:mb-4"
            >
                What is the expense for ?
            </label>
            <input
                type="text"
                id="bill-type"
                className="bg-blue-100 outline-none border-none rounded py-1 px-3 text-lg mb-2 md:text-[1.7rem] md:py-2 md:mb-6"
                ref={billtypeRef}
            />
            <label
                htmlFor="bill-value"
                className="text-xl font-sans font-semibold mb-2 text-gray-200 md:text-[1.75rem] md:mb-4"
            >
                Enter the expense amount
            </label>
            <input
                type="number"
                min={0}
                id="bill-value"
                className="bg-blue-100 outline-none border-none rounded py-1 px-3 text-lg mb-2 md:text-[1.7rem] md:py-2 md:mb-6"
                ref={billvalueRef}
            />
            <Button action={handleSubmit}>Submit</Button>
        </div>
    );
}

export default BillAmount;
