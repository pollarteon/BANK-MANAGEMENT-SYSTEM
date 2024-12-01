import styled from "styled-components"
import CustomInput from "../../UI/CustomInput"
import SelectInput from "../../UI/SelectInput"
import Button from "../../UI/Button"
import Header from "../../UI/Header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAccount, addTransaction } from "../../../redux/clientSlice"
import { useNavigate } from "react-router-dom"


import { collection, addDoc ,query,where} from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust based on your Firebase config file
import { getAuth } from "firebase/auth"
import { getDocs, doc } from "firebase/firestore";




const FormContainerStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const FormStyle = styled.form`
    width: 90%;
`

export default function UserForm({ type }) {

    const [formData, setFormData] = useState();
    const client = useSelector(state => state.client.client);
    const selectedAccount = useSelector(state => state.client.selectedAccount);
    const account = client.accounts.find((account) => account.accountId === selectedAccount);
    const balance = account.balance;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Perform any additional actions with the latest formData here
    }, [formData]);

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    function addYearsToDate(yearsToAdd) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + yearsToAdd);
        return date.toISOString().split('T')[0];
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (type == 'loan' && e.target.name == 'loanTerm') {
            setFormData((prev) => { return { ...prev, startDate: getCurrentDate(), lastDate: addYearsToDate(parseInt(prev.loanTerm, 10)) } });
        }
        if (type == 'transaction') {
            setFormData((prev) => { return { ...prev, date: getCurrentDate(), id: 'added123', status: 'Completed' } });
        }
        if (type == 'account') {
            let interestRate =0;
            if(formData && formData.accountType==='Savings'){
                    interestRate =  2.5 
            }
            setFormData((prev) => {
                return { ...prev, accountId: 'testadd1', accountHolder: `${client.personalInfo.firstName} ${client.personalInfo.lastName}`,balance:0,interestRate:interestRate,transactions:[],loans:[],createdDate:getCurrentDate() }
            })
        }
    }


//1 version

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const auth = getAuth();
    //     const currentUser = auth.currentUser;
    
    //     if (!currentUser) {
    //         console.error("No authenticated user found");
    //         alert("Please log in again.");
    //         return;
    //     }
    
    //     const uid = currentUser.uid; // Firebase Auth UID
    
    //     try {
    //         // Step 1: Fetch client data from Firestore
    //         const userCollectionRef = collection(db, "clients");
    //         const clientDocRef = query(userCollectionRef, where("uid", "==", uid));
    //         const clientDocs = await getDocs(clientDocRef);
    
    //         if (clientDocs.empty) {
    //             alert("Client data not found in Firestore. Please contact support.");
    //             return;
    //         }
    
    //         const clientData = clientDocs.docs[0].data(); // Data for the current user
    
    //         // Step 2: Validate formData
    //         if (!formData || !formData.accountType) {
    //             alert("Please fill in all required fields.");
    //             return;
    //         }
    
    //         // Step 3: Prepare account data
    //         const accountData = {
    //             ...formData,
    //             uid, // Link account to the authenticated user
    //             accountHolder: `${clientData.firstName} ${clientData.lastName}`,
    //             branch: clientData.branch,
    //             balance: 0,
    //             transactions: [],
    //             loans: [],
    //             createdDate: getCurrentDate(),
    //         };
    
    //         console.log("Prepared account data:", accountData);
    
    //         // Step 4: Add account to Firestore
    //         await addDoc(collection(db, "accounts"), accountData);
    
    //         // Step 5: Update Redux and navigate
    //         dispatch(addAccount({ account: accountData }));
    //         navigate("../../");
    
    //     } catch (error) {
    //         console.error("Error during handleSubmit:", error);
    //         alert("Failed to add account. Please try again.");
    //     }
    // };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const auth = getAuth();
        const currentUser = auth.currentUser;
    
        if (!currentUser) {
            console.error("No authenticated user found");
            alert("Please log in again.");
            return;
        }
    
        const uid = currentUser.uid; // Firebase Auth UID
    
        try {
            // Step 1: Fetch client data from Firestore
            const userCollectionRef = collection(db, "clients");
            const clientDocRef = query(userCollectionRef, where("uid", "==", uid));
            const clientDocs = await getDocs(clientDocRef);
    
            if (clientDocs.empty) {
                alert("Client data not found in Firestore. Please contact support.");
                return;
            }
    
            const clientData = clientDocs.docs[0].data(); // Data for the current user
    
            // Step 2: Validate formData
            if (!formData || !formData.accountType) {
                alert("Please fill in all required fields.");
                return;
            }
    
            // Step 3: Prepare account data without accountId
            const accountData = {
                ...formData,
                uid, // Link account to the authenticated user
                accountHolder: `${clientData.firstName} ${clientData.lastName}`,
                branch: clientData.branch,
                balance: 0,
                transactions: [],
                loans: [],
                createdDate: getCurrentDate(),
            };
    
            console.log("Prepared account data (before adding to Firestore):", accountData);
    
            // Step 4: Add account to Firestore
            const docRef = await addDoc(collection(db, "accounts"), accountData);
    
            // Step 5: Update account data with generated ID
            const accountId = docRef.id; // Firebase-generated unique ID
            accountData.accountId = accountId;
    
            // Optional: Update the document with the accountId in Firestore (not strictly necessary)
            // await updateDoc(docRef, { accountId });
    
            console.log("Final account data (with ID):", accountData);
    
            // Step 6: Update Redux and navigate
            dispatch(addAccount({ account: accountData }));
            navigate("../../");
    
        } catch (error) {
            console.error("Error during handleSubmit:", error);
            alert("Failed to add account. Please try again.");
        }
    };
    


    
    return (
        <FormContainerStyle>

            <FormStyle onSubmit={handleSubmit}>
                <Header title={type.toUpperCase()} color={type !== 'account' ? '#8eff77ff' : '#a7ffec'} />

                {type === 'transaction' && <div>
                    <SelectInput label={'TRANSACTION TYPE'} options={['debit', 'credit']} name={'type'} onChange={handleChange} />
                    <CustomInput label={'DESCRIPTION'} type={'textarea'} name={'description'} onChange={handleChange} notRequired={true} />
                    <CustomInput label={'AMOUNT(in Ruppees)'} type={'number'} name={'amount'} configs={{ step: 100, min: 0 }} onChange={handleChange} />
                    <CustomInput label={'RECIPIENT ACCOUNT ID'} type={'text'} name={'recipient'} onChange={handleChange} />
                    <Button type={'submit'} title={'MAKE PAYMENT'} color={'#8eff77ff'} />
                </div>}
                {type == 'loan' && <div>
                    <SelectInput onChange={handleChange} label={'LOAN TYPE'} options={['personal', 'education', 'auto']} name={'loanType'} />
                    <CustomInput onChange={handleChange} label={'LOAN AMOUNT'} type={'number'} name={'amount'} configs={{ step: 100, min: 0 }} />
                    <CustomInput onChange={handleChange} label={'LOAN TERM (in years)'} type={'number'} name={'loanTerm'} configs={{ min: 1 }} />
                    <CustomInput onChange={handleChange} label={'LOAN PURPOSE'} name={'purpose'} configs={{}} />
                    <Button type={'submit'} title={'APPLY LOAN'} color={'#8eff77ff'} />
                </div>}
                {type == 'account' && <div>
                    <SelectInput onChange={handleChange} label={'ACCOUNT TYPE'} options={['Savings', 'Current']} name={'accountType'} />
                    <Button type={'submit'} title={'ADD ACCOUNT'} color={'#a7ffec'} />
                </div>}



            </FormStyle>
        </FormContainerStyle>
    )
}