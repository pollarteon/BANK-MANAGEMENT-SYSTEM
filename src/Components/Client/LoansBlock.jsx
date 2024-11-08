import styled from "styled-components"
import Label from "./Label"
import { useState } from "react"


const LoansBlockContainer = styled.div`
    margin: 1em ;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 0.5em;
    cursor: pointer;
    &:hover{
        opacity: 0.75;
    }
`
const LoansIdStyle = styled.div`
    background-color:${(props) => props.backgroundcolor};;
    color: black;
    font-family: sans-serif;
    font-size: 1.25em;
    padding: 0.25em;
`

export default function LoansBlock({ loan }) {

    const [showDropDown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    }
    let backgroundColor;
    if (loan.status == 'Active') {
        backgroundColor = '#ffba79';
    } else if (loan.status == 'Closed') {
        backgroundColor = '#ff8d8d'
    } else {
        backgroundColor = '#73ff51'
    }

    // loanId: 'loan003',
    // amount: 200000,
    // interestRate: 7.2,
    // startDate: '2022-11-01',
    // endDate: '2027-11-01',
    // monthlyPayment: 3500,
    // status: 'Active',

    return (
        <LoansBlockContainer onClick={toggleDropdown}>
            <LoansIdStyle backgroundcolor={backgroundColor}>loan_ID : {loan.loanId}</LoansIdStyle>
            <div style={{ display: 'flex', cursor: 'pointer' }}>
                <Label label={'Amount'} value={loan.amount} />
                <Label label={"Status"} value={loan.status} />
                <Label label={"Loan Term"} value={loan.loanTerm} />
                <Label label={'Type'} value={loan.loanType.toUpperCase()} />
            </div>
            {showDropDown && <>
            <div style={{ display: 'flex', cursor: 'pointer' }}>
                <Label label={'Interest_Rate'} value={loan.interestRate} />
                <Label label={'Monthly_Payment'} value={loan.monthlyPayment} />
            </div>
            <div style={{ display: 'flex', cursor: 'pointer' }}>
                <Label label={"Start-Date"} value={loan.startDate} />
                <Label label={'End-Date'} value={loan.endDate} />
            </div></>}

        </LoansBlockContainer>
    )
}