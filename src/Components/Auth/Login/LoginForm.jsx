import Button from "../../UI/Button";
import CustomInput from "../../UI/CustomInput";
import styled from "styled-components";
import SelectInput from "../../UI/SelectInput";

const LoginFormStyle = styled.div`
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: white;
`;

export default function LoginForm({ setFormData, handleSubmit, formData, userType }) {

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <LoginFormStyle>
            <form onSubmit={handleSubmit} className="auth-form" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: "center" }}>

                <CustomInput  label={"E-MAIL"} type="email" name="email" value={formData.email} onChange={handleChange} required />
                <CustomInput label={"PASSWORD"} type="password" name="password" value={formData.password} onChange={handleChange} required configs={{minLength:5}}/>

                {userType === 'employee' && (
                    <>
                        <CustomInput label={"EMPLOYEE-ID"} type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
                    </>
                )}
                <SelectInput onChange={handleChange} label={'BRANCH'} name={'branch'} options={['Branch1','Branch2','Branch3','Branch4']}/>



                <Button title={'Login'} type={'submit'} />
            </form>
        </LoginFormStyle>

    );
}