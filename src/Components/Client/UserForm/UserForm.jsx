import styled from "styled-components"
import CustomInput from "../../UI/CustomInput"
import SelectInput from "../../UI/SelectInput"
import Button from "../../UI/Button"
import Header from "../../UI/Header"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAccount, addTransaction } from "../../../redux/clientSlice"
import { useNavigate } from "react-router-dom"

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
        console.log(formData)
        if (type == 'loan' && e.target.name == 'loanTerm') {
            setFormData((prev) => { return { ...prev, startDate: getCurrentDate(), lastDate: addYearsToDate(parseInt(prev.loanTerm, 10)) } });
        }
        if (type == 'transaction') {
            setFormData((prev) => { return { ...prev, date: getCurrentDate(), id: 'added123', status: 'Completed' } });
        }
        if (type == 'account') {
            setFormData((prev) => {
                let interestRate =0;
                if(formData && formData.accountType==='Savings'){
                      interestRate =  2.5 
                }
                return { ...prev, accountId: 'testadd1', accountHolder: `${client.personalInfo.firstName} ${client.personalInfo.lastName}`,balance:0,interestRate:interestRate,transactions:[],loans:[],createdDate:getCurrentDate() }
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (type == 'transaction' && balance < formData.amount) {
            console.log("insufficient Balance");
            return;
        }
        if (type === 'transaction') {

            dispatch(addTransaction({ transaction: formData, accountId: selectedAccount }));
            navigate('../transactions');
        }
        if(type==='account'){
            dispatch(addAccount({account:formData}));
            navigate('../../');
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