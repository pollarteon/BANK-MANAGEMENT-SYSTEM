import styled from "styled-components"
import Label from "../UI/Label"
import { useState } from "react"
import Header from "../UI/Header"
import { useSelector } from "react-redux"


const AccountBlockContainer = styled.div`
    margin: 1em ;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 0.5em;
    cursor: pointer;
    
`
const AccountIdStyle = styled.div`
    background-color:${(props) => props.backgroundcolor};;
    color: black;
    font-family: sans-serif;
    font-size: 1.25em;
    padding: 0.25em;
`

const DepositHeaderStyle = styled.div`
    background-color:#b0ffee ;
    font-family: sans-serif;
    padding: 0.5em;
    font-size: 1.25em;
    font-weight:bold;
    border: solid 1px;
    flex: 1;
    text-align: center;
`
const LabelStyle = styled.div`
    display : flex ;
    font-family: sans-serif;
    font-size: 1.15em;
    border: solid 1px;
`

export default function AccountDetailBlock({ account }) {

    let backgroundColor = '#6affdf'

    const [amount, setAmount] = useState();
    const userType = useSelector(state=>state.auth.userType);
    function handleChange(e) {
        setAmount(e.target.value)
    }
    function handledeposit(e) {

    }

    return (
        <AccountBlockContainer >
            <AccountIdStyle backgroundcolor={backgroundColor}>Account_ID : {account.accountId}</AccountIdStyle>
            <div style={{ display: 'flex' }}>
                <Label label={'Account_Holder'} value={account.accountHolder} />
                <Label label={"Account_Type"} value={account.accountType} />
                <Label label={"Balance"} value={account.balance} />
            </div>
            <div style={{ display: 'flex' }}>
                <Label label={'Interest_Rate'} value={account.interestRate} />
                <Label label={'Created_Date'} value={account.createdDate} />
            </div>
            {userType === 'employee' && <> <DepositHeaderStyle>
                MAKE DEPOSIT
            </DepositHeaderStyle>
                <div style={{ display: "flex" }}>
                    <label htmlFor="amount">ENTER AMOUNT</label>
                    <input type="number" name="amount" id="amount" onChange={handleChange} value={amount} />
                </div></>
            }

        </AccountBlockContainer>
    )
}