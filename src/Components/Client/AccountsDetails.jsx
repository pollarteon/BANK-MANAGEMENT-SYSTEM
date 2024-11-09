import { useSelector } from "react-redux"
import styled from "styled-components";
import AccountDetailBlock from "./AccountDetailBlock";
import Header from "../UI/Header";

const AccountsStyle = styled.div`
    overflow-y: scroll;
    height: 90vh;
    
`

export default function AccountDetails({ userType }) {

   
    const selectedClient = useSelector(state => state.employee.selectedClient);
    var client, clients;
    if (userType == 'client') {
        client = useSelector(state => state.client.client);
    }
    else {
        clients = useSelector(state => state.employee.clients)
        client = clients.find((client) => client.clientId === selectedClient);
    }

    const accounts = client.accounts


    return (
        <AccountsStyle>
            <Header title={'ACCOUNTS'} color={'#a7ffec'}/>
            {accounts.map((account) => <AccountDetailBlock key={account.accountId} account={account} />)}
        </AccountsStyle>
    )
}