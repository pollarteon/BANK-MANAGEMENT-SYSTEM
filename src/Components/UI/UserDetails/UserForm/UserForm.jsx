import styled from "styled-components"
import CustomInput from "../../CustomInput"
import SelectInput from "../../SelectInput"
import Button from "../../Button"
import Header from "../../Header"
import Transactions from "../../../Client/Transactions"

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


    return (
        <FormContainerStyle>

            <FormStyle onSubmit={(e) => { e.preventDefault() }}>
                <Header title={type.toUpperCase()} color={'#8eff77ff'} />

                {type === 'transaction' && <div>
                    <SelectInput label={'TRANSACTION TYPE'} options={['debit', 'credit']} name={'type'} />
                    <CustomInput label={'DESCRIPTION'} type={'textarea'} name={'description'} />
                    <CustomInput label={'AMOUNT(in Ruppees)'} type={'number'} name={'amount'} />
                    <CustomInput label={'RECIPIENT ACCOUNT ID'} type={'text'} name={'recipient'} />
                    <Button type={'submit'} title={'MAKE PAYMENT'} color={'#8eff77ff'} />
                </div>}


            </FormStyle>
        </FormContainerStyle>
    )
}