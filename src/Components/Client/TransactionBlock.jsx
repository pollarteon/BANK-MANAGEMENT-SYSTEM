import styled from "styled-components"
import Label from "./Label"
import { useState } from "react"


const TransactionBlockContainer = styled.div`
    margin: 1em ;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 0.5em;
    cursor: pointer;
    &:hover{
        opacity: 0.75;
    }
`
const TransactionIdStyle = styled.div`
    background-color:${(props)=>props.backgroundcolor};;
    color: black;
    font-family: sans-serif;
    font-size: 1.25em;
    padding: 0.25em;
`

export default function TransactionBlock({ transaction }) {

    const [showDropDown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    }
    let backgroundColor;
    if(transaction.status=='Pending'){
        backgroundColor='#ffba79';
    }else if(transaction.status=='Failed'){
        backgroundColor='#ff8d8d'
    }else{
        backgroundColor='#73ff51'
    }

    return (
        <TransactionBlockContainer  onClick={toggleDropdown}>
            <TransactionIdStyle backgroundcolor={backgroundColor}>Transaction_ID : {transaction.id}</TransactionIdStyle>
            <div style={{ display: 'flex', cursor:'pointer'}}>
                <Label label={'Amount'} value={transaction.amount} />
                <Label label={"Status"} value={transaction.status} />
                <Label label={'Date'} value={transaction.date} />
            </div>
            {showDropDown && <div style={{ display: 'flex', cursor:'pointer'}}>
                {transaction.description.length > 0 &&
                    <Label label={'Description'} value={transaction.description} isdescription={true}/>
                }
                <Label label={'Recipient Account_ID'} value={transaction.recipient} />
                <Label label={'Type'} value={transaction.type} />
            </div>}

        </TransactionBlockContainer>
    )
}