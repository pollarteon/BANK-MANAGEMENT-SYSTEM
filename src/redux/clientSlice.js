import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
    name: 'client',
    initialState: {
        client: {
            clientId: 'c1',
            personalInfo: {
                firstName: 'John',
                lastName: 'Doe',
                DOB: '12-01-2004',
            },
            contactInfo: {
                phone: '+91-9876543210',
                email: 'johndoe@gmail.com',
                address: '123 Main St, New Delhi, India'
            },
            accounts: [
                {
                    accountId: 'a1',
                    accountHolder: 'John Doe 1.0',
                    accountType: 'Savings',
                    balance: 25250,
                    interestRate:2.5, // in percentage
                    createdDate: '2022-05-01',
                    transactions: [ //later only the transaction ids will be stored
                        {
                            id: 'txn001',
                            date: '2024-10-01',
                            amount: 5000,
                            type: 'credit',
                            description: 'Salary Payment',
                            status: 'Completed',
                            recipient: 'a1',
                        },
                        {
                            id: 'txn002',
                            date: '2024-10-05',
                            amount: 1500,
                            type: 'debit',
                            description: 'Grocery Shopping',
                            status: 'Completed',
                            recipient: 'a2',
                        },
                        {
                            id: 'txn003',
                            date: '2024-10-12',
                            amount: 200,
                            type: 'debit',
                            description: 'Electricity Bill',
                            status: 'Pending',
                            recipient: 'a1',
                        },
                        {
                            id: 'txn004',
                            date: '2024-10-15',
                            amount: 10000,
                            type: 'credit',
                            description: 'Freelance Project Payment',
                            status: 'Completed',
                            recipient: 'a1',
                        },
                        {
                            id: 'txn005',
                            date: '2024-10-20',
                            amount: 3000,
                            type: 'debit',
                            description: 'Restaurant Bill',
                            status: 'Completed',
                            recipient: 'a3',
                        },
                        {
                            id: 'txn006',
                            date: '2024-10-25',
                            amount: 250,
                            type: 'debit',
                            description: '',
                            status: 'Failed',
                            recipient: 'a4',
                        },
                        {
                            id: 'txn007',
                            date: '2024-10-27',
                            amount: 4500,
                            type: 'credit',
                            description: 'Investment Return',
                            status: 'Completed',
                            recipient: 'a2',
                        },
                        {
                            id: 'txn008',
                            date: '2024-10-30',
                            amount: 1200,
                            type: 'debit',
                            description: 'Online Shopping',
                            status: 'Completed',
                            recipient: 'a2',
                        },

                    ],
                    loans: [
                        {
                            loanId: 'loan003',
                            amount: 200000,
                            interestRate: 7.2,
                            startDate: '2022-11-01',
                            endDate: '2027-11-01',
                            monthlyPayment: 3500,
                            status: 'Active',
                            loanTerm:5,
                            loanType:'auto',
                        },
                    ],
                },
                {
                    accountId: 'a2',
                    accountHolder: 'John Doe',
                    accountType: 'Current',
                    balance: 25000,
                    interestRate: 4.5, 
                    createdDate: '2023-01-01',
                    transactions: [ //later only the transaction ids will be stored
                        {
                            id: 'txn001',
                            date: '2024-10-01',
                            amount: 5000,
                            type: 'credit',
                            description: 'Salary Payment',
                            status: 'Completed',
                            recipient: 'a1',
                        },
                        {
                            id: 'txn002',
                            date: '2024-10-05',
                            amount: 1500,
                            type: 'debit',
                            description: 'Grocery Shopping',
                            status: 'Completed',
                            recipient: 'a2',
                        },
                        {
                            id: 'txn003',
                            date: '2024-10-12',
                            amount: 200,
                            type: 'debit',
                            description: 'Electricity Bill',
                            status: 'Pending',
                            recipient: 'a1',
                        },
                        {
                            id: 'txn004',
                            date: '2024-10-15',
                            amount: 10000,
                            type: 'credit',
                            description: 'Freelance Project Payment',
                            status: 'Completed',
                            recipient: 'a1',
                        },
                    ],
                    loans: [
                        {
                            loanId: 'loan003',
                            amount: 200000,
                            interestRate: 7.2,
                            startDate: '2022-11-01',
                            endDate: '2027-11-01',
                            monthlyPayment: 3500,
                            status: 'Active',
                            loanTerm:5,
                            loanType:'education'
                        },
                        {
                            loanId: 'loan002',
                            amount: 140000,
                            interestRate: 2.2,
                            startDate: '2022-10-23',
                            endDate: '2025-10-23',
                            monthlyPayment: 5000,
                            status: 'Closed',
                            loanTerm:3,
                            loanType:'personal'
                        },
                    ],
                }
            ],
            branchId: 'b1',
            createdTime: '2024-01-01T10:00:00Z',
            lastLoginTime: '2024-10-01T08:30:00Z',
        },
        isEditting: false,
        selectedAccount: null,
    },
    reducers: {
        deleteAccount(state, action) {
            state.accountId = null;
            state.branchId = null;
        },
        editContactInfo(state, action) {
            state.contactInfo = {
                email: state.contactInfo.email,
                phoneNo: action.payload.phoneNo,
                address: action.payload.address
            };
        },
        setSelectedAccount(state, action) {
            const account_ID = action.payload.selectedAccount;
            if (account_ID == '') state.selectedAccount = null;
            else state.selectedAccount = action.payload.selectedAccount;
        },
        addTransaction(state,action){
            const transaction = action.payload.transaction;
            //console.log(transaction);
            const account = state.client.accounts.find((account)=>account.accountId===action.payload.accountId);
            account.transactions.push(transaction);
            account.balance-=transaction.amount;
            console.log("added");
            //console.log(account.transactions);
        },
        addLoan(state,action){
            const loan  = action.payload.loan;
            console.log(loan);
            const account = state.client.accounts.find((account)=>account.accountId===action.payload.accountId);
            account.loans.push(loan);
            console.log("Loan added (Waiting for approval)");
        },
        resetAccountId(state,action){
            state.selectedAccount=null;
        },
        addAccount(state,action){
            const account = action.payload.account;
            console.log(account);
            const accounts = state.client.accounts;
            accounts.push(account);
            console.log("Account added..");
        },
        setClient(state,action){
            const client = action.payload;
            state.client = client;
        }
    }
});

export const { addAccount, deleteAccount, editContactInfo, setSelectedAccount,addTransaction,addLoan,resetAccountId ,setClient} = clientSlice.actions;
export default clientSlice.reducer;