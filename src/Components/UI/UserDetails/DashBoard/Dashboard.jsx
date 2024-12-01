import { useDispatch, useSelector } from "react-redux"
import DashboardTab from "./DashboardTab";
import styled from "styled-components";
import SelectInput from "../../SelectInput";
import { useNavigate } from "react-router-dom";
import { setLoans, setSelectedAccount, setTransactions } from "../../../../redux/clientSlice";
import { useEffect } from "react";
import { fetchLoansByAccountId, fetchtransactionsByAccountId } from "../../../../firestoreMethods";

const DashboradContainer = styled.div`
    border-right: solid 1px;
    margin: 0 1em 0 0;
    display: flex;
    flex-direction: column;
    height: 95vh;
`

export default function Dashboard({ userType }) {
    let dashboardTabs;

    const selectedAccount = useSelector(state => state.client.selectedAccount);
    const client = useSelector(state => state.client.client);
    const employee = useSelector(state => state.employee)
    const accounts = client.accounts;
    const options = accounts.map(account => account.accountId);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(()=>{
        const fetchData = async()=>{
            if(selectedAccount){
                const loans =await fetchLoansByAccountId(selectedAccount);
                const transactions =await fetchtransactionsByAccountId(selectedAccount);
                console.log(transactions)
                console.log(loans);
                dispatch(setTransactions({transactions:transactions,accountId:selectedAccount}));
                dispatch(setLoans({loans:loans,accountId:selectedAccount}))
            }else{
            }
        }
        fetchData()
    },[dispatch,selectedAccount])

    function handleAccountChange(event) {
        const selectedAccountId = event.target.value;
        if (selectedAccountId.length != 0) {
            dispatch(setSelectedAccount({ selectedAccount: selectedAccountId }));
            navigate(`accounts/${selectedAccountId}`);
        }
        else {
            dispatch(setSelectedAccount({ selectedAccount: null }));
            navigate('');
        }
    }

    if (userType === 'client') {
        dashboardTabs = [
            { link: ``, title: 'User Details' },
            { link: `accounts/new`, title: 'Add A New Account' }
        ]
        if (selectedAccount != null) {
            dashboardTabs = [...dashboardTabs,
            { link: 'accounts', title: 'Accounts' },
            { link: `accounts/${selectedAccount}/transactions`, title: 'Transactions' },
            { link: `accounts/${selectedAccount}/loans`, title: 'Loans' },
            { link: `accounts/${selectedAccount}/transactions/new`, title: 'Make Transaction' },
            { link: `accounts/${selectedAccount}/loans/new`, title: 'Apply Loan' },

            ]
        }
    }
    if (userType === 'employee') {
        dashboardTabs = [
            { link: '', title: 'Employee Details' },
            { link: 'clients', title: 'View All Clients' }
        ]
    }

    return (
        <DashboradContainer>
            {userType == 'client' && <div>
                <SelectInput label={'Select Account'} options={options} name={'account'} onChange={handleAccountChange} />
            </div>}
            <div style={{marginTop:'2em'}}>
                {
                    dashboardTabs.map((dashboardTab) => {
                        return <DashboardTab key={dashboardTab.link} link={dashboardTab.link} title={dashboardTab.title} />
                    })
                }
            </div>

        </DashboradContainer>
    )
}