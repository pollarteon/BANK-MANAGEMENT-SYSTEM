import { useSelector } from "react-redux"
import TransactionBlock from "./TransactionBlock";
import styled from "styled-components";

const TransactionStyle = styled.div`
    overflow-y: scroll;
    height: 90vh;
    
`

export default function Transactions(){
    
    const selectedAccount = useSelector(state=>state.client.selectedAccount);
    const client = useSelector(state=>state.client.client);
    const accounts = client.accounts
    const account = accounts.find(acc => acc.accountId === selectedAccount);
    const transactions = account.transactions;
    return (
        <TransactionStyle>
            {transactions.map((transaction)=><TransactionBlock key={transaction.id} transaction={transaction}/>)}
        </TransactionStyle>
    )
}