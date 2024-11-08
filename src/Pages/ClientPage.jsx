import styled from "styled-components"
import Dashboard from "../Components/UI/UserDetails/DashBoard/Dashboard"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PageContainer = styled.div`
    margin-top:70px;
    display: flex;
`

export default function ClientPage(){

    const dashboard = useSelector(state=>state.app.dashboard);
    const userType = useSelector(state=>state.auth.userType);


    return (
        <PageContainer>
            {dashboard && <div style={{flex:1.2}}><Dashboard userType={userType}/></div> }
            <div style={{flex:4,padding:'1em'}}>
            <Outlet/>
            </div>
           
        </PageContainer>
    )
}