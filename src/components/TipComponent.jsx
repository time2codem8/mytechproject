import { createContext, useContext, useState } from "react"
import InputGroup from "./InputGroup"

const TipContext = createContext({
    totalAmount: 0,      // Total amount to be paid by each person (bill + tip)
    tipAmountPerPerson: 0,  // Tip amount to be paid by each person
    setTotalAmount: (totalAmount, tipAmountPerPerson) => { },
})

export function TipForm() {
    const { setTotalAmount } = useContext(TipContext)  // Get the setTotalAmount function from context

    function handleSubmit(e) {
        e.preventDefault()  // Prevent form from reloading the page on submit

        const formData = new FormData(e.target)  // Get form data
        const data = Object.fromEntries(formData.entries())  // Convert FormData to an object

        const { bill, tip, people } = data  // Extract bill, tip, and people from form data

        // Convert values from string to numbers for calculation
        const billAmount = parseFloat(bill);
        const tipPercentage = parseFloat(tip);
        const numberOfPeople = parseInt(people, 10);

        // Validate inputs
        if (isNaN(billAmount) || isNaN(tipPercentage) || isNaN(numberOfPeople) || numberOfPeople <= 0) {
            alert("Please enter valid numbers.");
            return;
        }

        // Calculate tip amount
        const tipAmount = (tipPercentage / 100) * billAmount;

        // Calculate total amount (bill + tip)
        const totalAmount = billAmount + tipAmount;

        // Calculate tip amount per person
        const tipAmountPerPerson = tipAmount / numberOfPeople;

        // Calculate total amount per person (bill + tip) divided by number of people
        const amountPerPerson = totalAmount / numberOfPeople;

        // Set the total amount and tip amount per person in the context
        setTotalAmount(amountPerPerson, tipAmountPerPerson);  // Pass both values to the context
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-l-xl">
            <InputGroup type="text" label="Bill Amount" placeholder="Enter Bill Amount" name="bill" />
            <div className="grid grid-cols-1 gap-4">
                <InputGroup type="text" label="Tip Percentage" placeholder="Enter Tip Percentage" name="tip" />
                <InputGroup type="number" label="Number of People" placeholder="Enter Number of People" name="people" />
            </div>
            <button className="bg-[#DADA33] px-3 py-2 rounded-full font-semibold">Calculate Tip</button>
        </form>
    )
}

export function TipResult() {
    const { totalAmount, tipAmountPerPerson } = useContext(TipContext)  // Get the total amount and tip amount from context

    return (
        <div className="bg-[#133040] w-full h-full rounded-bl-4xl rounded-r-xl text-white">
            <div>
                Amount to be paid by each person: <br />
                {parseFloat(totalAmount).toFixed(2)} {/* Display the total amount per person */}
            </div>
            <div>
                Tip to be paid by each person: <br />
                {parseFloat(tipAmountPerPerson).toFixed(2)} {/* Display the tip per person */}
            </div>
        </div>
    )
}

export default function TipCalculatorComponent() {
    const [totalAmount, setTotalAmount] = useState(0)  // State for the total amount per person
    const [tipAmountPerPerson, setTipAmountPerPerson] = useState(0)  // State for the tip per person

    const updateTotalAmount = (newTotalAmount, newTipAmountPerPerson) => {
        setTotalAmount(newTotalAmount);
        setTipAmountPerPerson(newTipAmountPerPerson);
    }

    return (
        <TipContext.Provider value={{ totalAmount, tipAmountPerPerson, setTotalAmount: updateTotalAmount }}>
            <div className="grid grid-cols-2 items-center max-w-2xl mx-auto">
                <TipForm />
                <TipResult />
            </div>
        </TipContext.Provider>
    )
}

TipCalculatorComponent.Form = TipForm;
TipCalculatorComponent.Result = TipResult;
