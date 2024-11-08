import { useSelector } from "react-redux"
import styled from "styled-components";
import AccountDetailBlock from "./AccountDetailBlock";

const AccountsStyle = styled.div`
    overflow-y: scroll;
    height: 90vh;
    
`

export default function AccountDetails(){
    
    const selectedAccount = useSelector(state=>state.client.selectedAccount);
    const client = useSelector(state=>state.client.client);
    const accounts = client.accounts
    
    return (
        <AccountsStyle>
            {accounts.map((account)=><AccountDetailBlock key={account.accountId} account={account}/>)}
        </AccountsStyle>
    )
}