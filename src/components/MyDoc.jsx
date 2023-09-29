import { Page, Text, View, Document } from "@react-pdf/renderer";
import { nameFormatter } from "../helpers/nameFormatter";

const MyDoc = ({ state }) => (
    <Document>
        <Page
            size="A4"
            style={{
                backgroundColor: "aliceblue",
                padding: 25,
                flexDirection: "column",
                justifyContent: "flex-start",
                flex: 1,
            }}
        >
            <View
                style={{
                    border: "5px solid black",
                    flex: 1,
                    borderRadius: 8,
                }}
            >
                <View
                    style={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                        marginVertical: 50,
                        textDecoration: "underline",
                    }}
                >
                    <Text>Details of your expense</Text>
                </View>
                <View
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginLeft: 15,
                    }}
                >
                    <Text style={{ marginBottom: 8 }}>
                        Expense type : {state.billtype.toUpperCase()}
                    </Text>
                </View>
                <View
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginLeft: 15,
                    }}
                >
                    <Text style={{ marginBottom: 25 }}>
                        Expense amount : {state.billvalue}
                    </Text>
                </View>
                <View
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginLeft: 15,
                    }}
                >
                    <Text style={{ marginBottom: 35 }}>
                        Total amount is paid by {nameFormatter(state.paidBy)}
                    </Text>
                </View>
                {Object.entries(state.amount).map((name, i) => {
                    if (name[0].toLowerCase() === "user")
                        return (
                            <View
                                key={i}
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginBottom: 6,
                                    marginLeft: 15,
                                }}
                            >
                                <Text>Your part is : {name[1]}</Text>
                            </View>
                        );
                    else
                        return (
                            <View
                                key={i}
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginBottom: 6,
                                    marginLeft: 15,
                                }}
                            >
                                <Text>
                                    {nameFormatter(name[0])}'s part is :{" "}
                                    {name[1]}
                                </Text>
                            </View>
                        );
                })}
                <View style={{ marginTop: 30 }}>
                    {state.paidBy === "user" &&
                        state.friends.map((f, i) => (
                            <View
                                key={i}
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginBottom: 6,
                                    marginLeft: 15,
                                }}
                            >
                                <Text>
                                    {nameFormatter(f.name)} owes you{" "}
                                    {state.amount[f.name]}
                                </Text>
                            </View>
                        ))}
                    {state.paidBy !== "user" &&
                        state.friends.map((f, i) => {
                            if (f.name === state.paidBy) return;
                            return (
                                <View
                                    key={i}
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        marginBottom: 6,
                                        marginLeft: 15,
                                    }}
                                >
                                    <Text>
                                        {nameFormatter(f.name)} owes{" "}
                                        {nameFormatter(state.paidBy)}{" "}
                                        {state.amount[f.name]}
                                    </Text>
                                </View>
                            );
                        })}
                    {state.paidBy !== "user" && (
                        <View
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                marginBottom: 6,
                                marginLeft: 15,
                            }}
                        >
                            <Text>
                                You owe {nameFormatter(state.paidBy)}{" "}
                                {state.amount["user"]}
                            </Text>
                        </View>
                    )}
                </View>
                <View
                    style={{
                        fontSize: 12,
                        position: "absolute",
                        bottom: 10,
                        left: 15,
                    }}
                >
                    <Text>
                        Generated on {new Date().toLocaleTimeString()},{" "}
                        {new Date().toDateString()} by SplitIt
                    </Text>
                </View>
            </View>
        </Page>
    </Document>
);

export { MyDoc };
