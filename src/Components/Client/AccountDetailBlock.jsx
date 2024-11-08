import styled from "styled-components"
import Label from "./Label"
import { useState } from "react"


const AccountBlockContainer = styled.div`
    margin: 1em ;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 0.5em;
    
`
const AccountIdStyle = styled.div`
    background-color:${(props) => props.backgroundcolor};;
    color: black;
    font-family: sans-serif;
    font-size: 1.25em;
    padding: 0.25em;
`

export default function AccountDetailBlock({ account }) {

    let backgroundColor = '#6affdf'



    return (
        <AccountBlockContainer >
            <AccountIdStyle backgroundcolor={backgroundColor}>Account_ID : {account.accountId}</AccountIdStyle>
            <div style={{ display: 'flex' }}>
                <Label label={'Account_Holder'} value={account.accountHolder} />
                <Label label={"Account_Type"} value={account.accountType} />
                <Label label={"Balance"} value={account.balance} />
            </div>
            <div style={{ display: 'flex' }}>
                <Label label={'Balance'} value={account.balance} />
                <Label label={'Interest_Rate'} value={account.interestRate} />
                <Label label={'Created_Date'} value={account.createdDate} />
            </div>
        </AccountBlockContainer>
    )
}