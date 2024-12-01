import { useSelector } from "react-redux"
import LoansBlock from "./LoansBlock";
import styled from "styled-components";
import Header from "../UI/Header";
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
    // console.log(loans)
    return (
        <LoansStyle>
             <Header title={'LOANS'} color={'#73ff51'}/>
            {loans.map((loan)=> <LoansBlock key={loan.loanId} loan={loan}/>)}
        </LoansStyle>
    )
}