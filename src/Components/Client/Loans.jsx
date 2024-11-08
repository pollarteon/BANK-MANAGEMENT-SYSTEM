import { useSelector } from "react-redux"
import LoansBlock from "./LoansBlock";
import styled from "styled-components";

const LoansStyle = styled.div`
    overflow-y: scroll;
    height: 90vh;
    
`

export default function Loans(){
    
    const selectedAccount = useSelector(state=>state.client.selectedAccount);
    const client = useSelector(state=>state.client.client);
    const accounts = client.accounts
    const account = accounts.find(acc => acc.accountId === selectedAccount);
    const loans = account.loans;
    return (
        <LoansStyle>
            {loans.map((loan)=> <LoansBlock key={loan.id} loan={loan}/>)}
        </LoansStyle>
    )
}