import UserDetailBlock from "../UI/UserDetails/UserDetailBlock"
import { useSelector } from "react-redux";

export default function Details() {
    const client = useSelector(state=>state.client.client);
    var personalInfo = client.personalInfo;
    const personalInfoArray = [
        {label:'ID',value:client.clientId},
        {label:'First_Name',value:personalInfo.firstName},
        {label:'Last_Name',value:personalInfo.lastName},
        {label:'Date Of Birth',value:personalInfo.DOB},
    ]
    var contactInfo = client.contactInfo;
    const contactInfoArray =[
        {label:'Phone-no',value:contactInfo.phoneNo},
        {label:'E-mail',value:contactInfo.email},
        {label:'Address',value:contactInfo.address},
    ]
    const activityLogsArray = [
        {label:'User-Creation',value:client.createdTime},
        {label:'Last-Login',value:client.lastLoginTime},
    ]
    return (
        <>
            <UserDetailBlock datas={personalInfoArray} title={'PERSONAL DETAILS'} />
            <UserDetailBlock datas={contactInfoArray} title={'CONTACT INFO'} />
            <UserDetailBlock datas={activityLogsArray} title={'ACCOUNT LOGS'} />
        </>
    )
}