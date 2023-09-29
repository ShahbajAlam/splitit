import { Fragment, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import Context from "../context/context";
import { nameFormatter } from "../helpers/nameFormatter";
import { errorToast } from "../helpers/errorToast";
import Button from "./Button";

function Split() {
    const { state, setState } = useContext(Context);
    const [whoIsPaying, setWhoIsPaying] = useState("user");
    const [amount, setAmount] = useState(() =>
        state.friends.reduce(
            (acc, _, i) => Object.assign({ [state.friends[i].name]: "" }, acc),
            { user: "" }
        )
    );
    const total = Object.values(amount).reduce((acc, curr) => acc + curr, 0);

    const userValidation = (e) => {
        setAmount((amount) => ({
            ...amount,
            user: +e.target.value,
        }));
    };

    const friendsValidation = (e, i) => {
        setAmount((amount) => ({
            ...amount,
            [state.friends[i].name]: +e.target.value,
        }));
    };

    const handleSplit = () => {
        if (total > state.billvalue) {
            errorToast(
                "Total amount is greater than bill amount",
                "more",
                <img src="error.png" width={25} height={25} className="mr-2" />
            );
            return;
        }
        if (total < state.billvalue) {
            errorToast(
                "Total amount is less than bill amount",
                "less",
                <img src="error.png" width={25} height={25} className="mr-2" />
            );
            return;
        }
        setState((state) => ({ ...state, status: "success", amount }));
    };

    return (
        <div className="flex flex-col bg-[#22668D] rounded-lg px-5 py-8 w-full md:w-[75%] md:px-10 md:py-10 lg:w-[55%]">
            <Toaster />
            <div className="mb-10">
                <h1 className="text-xl font-sans font-semibold mb-2 text-gray-200 md:text-[1.75rem] md:mb-4">
                    Total bill for {state.billtype.toUpperCase()} is &#8377;
                    {state.billvalue}/-
                </h1>
            </div>
            <label
                htmlFor="whoispaying"
                className="text-xl font-sans font-semibold mb-2 text-gray-200 md:text-[1.75rem] md:mb-4"
            >
                Who is paying the bill?
            </label>
            <select
                className="bg-blue-100 outline-none border-none rounded py-1 px-3 text-lg mb-2 md:text-[1.7rem] md:py-2 md:mb-6"
                value={whoIsPaying}
                onChange={(e) => {
                    setWhoIsPaying(e.target.value);
                    setState((state) => ({ ...state, paidBy: e.target.value }));
                }}
            >
                <option value="user">You</option>
                {state.friends.map((f) => (
                    <option value={f.name} key={f.email}>
                        {nameFormatter(f.name)}
                    </option>
                ))}
            </select>
            <label
                htmlFor="yourpart"
                className="text-xl font-sans font-semibold mb-2 text-gray-200 md:text-[1.75rem] md:mb-4"
            >
                Your part :
            </label>
            <input
                type="number"
                id="yourpart"
                className="bg-blue-100 outline-none border-none rounded py-1 px-3 text-lg mb-2 md:text-[1.7rem] md:py-2 md:mb-6"
                value={amount.user}
                onChange={(e) => userValidation(e)}
            />
            {state.friends.map((f, i) => {
                return (
                    <Fragment key={f.email}>
                        <label
                            htmlFor={f.email}
                            className="text-xl font-sans font-semibold mb-2 text-gray-200 md:text-[1.75rem] md:mb-4"
                        >
                            {`${nameFormatter(f.name)}'s`} part :
                        </label>
                        <input
                            type="number"
                            id={f.email}
                            className="bg-blue-100 outline-none border-none rounded py-1 px-3 text-lg mb-2 md:text-[1.7rem] md:py-2 md:mb-6"
                            value={amount[state.friends[i].name]}
                            onChange={(e) => friendsValidation(e, i)}
                        />
                    </Fragment>
                );
            })}
            <Button action={handleSplit}>Split</Button>
        </div>
    );
}

export default Split;
