import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import Context from "../context/context";
import { nameFormatter } from "../helpers/nameFormatter";
import { errorToast } from "../helpers/errorToast";
import { successToast } from "../helpers/successToast";
import Button from "./Button";

function AddFriends() {
    const [name, setName] = useState("");
    const { state, setState } = useContext(Context);
    const friendsNames = state.friends.map((f) => f.name);

    function resetInputs() {
        setName("");
    }

    function handleAdd() {
        if (!name) {
            errorToast(
                "Enter the name of your friend",
                "iperror",
                <img src="error.png" width={25} height={25} className="mr-2" />
            );
            return;
        }

        if (friendsNames.includes(name)) {
            errorToast(
                `${nameFormatter(name)} is already added`,
                "existerror",
                <img src="error.png" width={25} height={25} className="mr-2" />
            );
            return;
        }

        setState((state) => ({
            ...state,
            friends: [...state.friends, { name }],
        }));

        successToast(
            `${nameFormatter(name)} is added for this bill`,
            "added",
            <img src="check.png" width={25} height={25} className="mr-2" />
        );
        resetInputs();
    }

    function handleSubmit() {
        if (state.friends.length === 0) {
            errorToast(
                "Add atleast one friend",
                "addfrienderror",
                <img src="error.png" width={25} height={25} className="mr-2" />
            );
            return;
        }
        setState((state) => ({
            ...state,
            status: "split",
        }));
    }

    return (
        <div className="flex flex-col bg-[#22668D] rounded-lg px-5 py-8 w-full md:w-[75%] md:px-10 md:py-10 lg:w-[55%]">
            <Toaster />
            <label
                htmlFor="name"
                className="text-xl font-sans font-semibold mb-2 text-gray-200 md:text-[1.75rem] md:mb-4"
            >
                Enter your friend's name
            </label>
            <input
                type="text"
                id="name"
                className="bg-blue-100 outline-none border-none rounded py-1 px-3 text-lg mb-2 md:text-[1.7rem] md:py-2 md:mb-6"
                value={name}
                onChange={(e) => setName(e.target.value.trim())}
            />
            <Button action={handleAdd}>Add</Button>
            <span className="ml-auto text-lg">
                <p className="inline mr-4 text-gray-200 md:text-xl">
                    Done adding friends?
                </p>
                <Button action={handleSubmit}>Submit</Button>
            </span>
        </div>
    );
}

export default AddFriends;
