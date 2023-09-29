import { useContext, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Context from "../context/context";
import { MyDoc } from "./MyDoc";
import Button from "./Button";

function PrintPdf() {
    const { state, setState } = useContext(Context);
    const [disabled, setDisabled] = useState(true);

    const resetApp = () => {
        setState({
            billtype: "",
            billvalue: 0,
            friends: [],
            paidBy: "user",
            amount: {},
            status: "billamount",
        });
    };

    return (
        <div className="flex flex-col items-center rounded-lg px-5 py-8 w-full md:w-[75%] md:px-10 md:py-10 lg:w-[55%]">
            <img src="invoice.svg" className="w-[25rem] md:w-[30rem]" />
            <PDFDownloadLink
                onClick={setDisabled.bind(null, false)}
                style={{ width: "100%" }}
                document={<MyDoc state={state} />}
                fileName={`${state.billtype.toLowerCase()}-bill.pdf`}
            >
                {({ loading }) =>
                    loading ? (
                        <h1>Loading document...</h1>
                    ) : (
                        <Button payload="w-full mt-6 lg:w-[70%] block mx-auto">
                            Download your bill now!
                        </Button>
                    )
                }
            </PDFDownloadLink>
            <Button
                action={resetApp}
                payload="w-full mt-10 lg:w-[70%] block mx-auto"
                disabled={disabled}
            >
                Go to home
            </Button>
        </div>
    );
}

export default PrintPdf;
