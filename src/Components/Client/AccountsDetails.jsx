import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components";
import AccountDetailBlock from "./AccountDetailBlock";
import Header from "../UI/Header";
import { useEffect, useState } from "react";
import { fetchAccountsByBranch, fetchAccountsByClientId } from "../../firestoreMethods";
import { setAccounts, setselectedAccount} from "../../redux/employeeSlice";
import { useNavigate } from "react-router-dom";

const AccountsStyle = styled.div`
    overflow-y: scroll;
    height: 90vh;
    
`

export default function AccountDetails({ userType ,branch}) {

   
    const selectedClient = useSelector(state => state.employee.selectedClient);
    const branchId = useSelector(state=> state.employee.employee.branch)
    const [loading,setloading] = useState(false);
    var client, clients;
    let accounts;

    const dispatch = useDispatch()
    const navigate = useNavigate();
    function handleClick(accountId){
        // console.log(accountId)
        dispatch(setselectedAccount(accountId))
        if(userType=='employee')
        navigate(`${accountId}`);
    }
    
    
    useEffect(()=>{
        const fetchData = async()=>{
            if(branch){
                setloading(true)
                accounts = await fetchAccountsByBranch(branchId);
                dispatch(setAccounts(accounts));
                setloading(false)
            }else{
                setloading(true);
                accounts = await fetchAccountsByClientId(selectedClient);
                dispatch(setAccounts(accounts));
                setloading(false)
            }
        }
        
        fetchData();
     
    },[])

    if (userType == 'client') {
        client = useSelector(state => state.client.client);
        accounts = client.accounts
    }
    else {
        clients = useSelector(state => state.employee.clients)
        client = clients.find((client) => client.clientId === selectedClient);
    }
   
   if(userType==='employee')
    accounts = useSelector(state=>state.employee.accounts)
    
    
    // console.log(selectedClient)

    return (
        <AccountsStyle>
            <Header title={'ACCOUNTS'} color={'#a7ffec'}/>
            {loading ? <div>LOADING .........</div> : accounts.map((account) => <AccountDetailBlock key={account.accountId} account={account} onclick={handleClick}/>)}
            
        </AccountsStyle>
    )
}