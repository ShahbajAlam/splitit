import { useState } from "react";
import "./index.css";
import BillInput from "./components/BillAmount";
import Context from "./context/context";
import AddFriends from "./components/AddFriends";
import Split from "./components/Split";
import Success from "./components/Success";
import PrintPdf from "./components/PrintPdf";

function App() {
    const [state, setState] = useState({
        billtype: "",
        billvalue: 0,
        friends: [],
        paidBy: "user",
        amount: {},
        status: "billamount",
    });

    return (
        <Context.Provider value={{ state, setState }}>
            <div className="flex flex-col p-5 justify-center items-center w-full min-h-screen bg">
                {state.status === "billamount" && <BillInput />}
                {state.status === "addfriend" && <AddFriends />}
                {state.status === "split" && <Split />}
                {state.status === "success" && <Success />}
                {state.status === "pdf" && <PrintPdf />}
            </div>
        </Context.Provider>
    );
}

export default App;
