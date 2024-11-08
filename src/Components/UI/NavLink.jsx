import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/authSlice"
import { link } from "framer-motion/client"
import { resetDashBoard } from "../../redux/appSlice"

const NavlinkContainer = styled.div`

    font-weight:bold;
    font-family: sans-serif ;
    
    cursor: pointer;
    padding: 1 0 1em 0;
    margin: 0 3em;
    width: 9em;
    text-align:center;
    transition: all 50ms;

`

const NavLinkStyled = styled(NavLink)`
    color: ${(props)=>props.fontcolor||"white"};
    font-weight: 100;
    text-decoration: none;
    &.active{
        text-decoration: underline;
        font-weight: bold;
    }
`

export default function Navlink({fontColor,linkTitle}){

    var toLink = linkTitle;
    const dispatch = useDispatch();
    const userType = useSelector(state=>state.auth.userType);
    const userId = useSelector(state=>state.auth.userId);
    
    function handleLogout(){
        dispatch(logout());
        dispatch(resetDashBoard());
    }

    if(linkTitle=="LOGIN/REGISTER"){
        toLink = "auth"
    }else if(linkTitle=="HOME"){
        toLink=""
    }
    else if(linkTitle=="LOGOUT"){
        toLink="auth"
    }else if(linkTitle=='ACCOUNT'){
        toLink=`${userType}/${userId}`
    }
    return (
        <NavlinkContainer fontcolor={fontColor}>
            <NavLinkStyled fontcolor={fontColor} to={`/${toLink}`} onClick={linkTitle=='LOGOUT' && handleLogout}>{linkTitle}</NavLinkStyled>
        </NavlinkContainer>
    )
}