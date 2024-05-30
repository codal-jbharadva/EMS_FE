import { FC } from "react";
import "./index.scss";
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logout } from "../../redux/slices/userAuthSlice";
import ProfileDropdown from "../../commoncomponent/profiledropdown/ProfileDropdown";
const Navbar:FC= ()=>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const data = useAppSelector(state=>state.auth);

    return (
        <div className="parent">
        <ContentWrapper>
            <nav className="navbar">
                <div className="leftpanel">
                    <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.9045 9.8965C27.4641 9.8965 27.9089 9.43733 27.9089 8.86337V7.60067C27.9089 1.96155 26.1871 0.254028 20.5623 0.254028H11.5224H7.87785C2.25306 0.254028 0.531189 1.9759 0.531189 7.60067V8.21767C0.531189 8.79163 0.976007 9.23645 1.53562 9.23645C2.74093 9.23645 3.70231 10.2122 3.70231 11.4031C3.70231 12.5941 2.74093 13.5842 1.53562 13.5842C0.976007 13.5842 0.531189 14.029 0.531189 14.603V15.22C0.531189 20.8591 2.25306 22.5666 7.87785 22.5666H11.5081H20.5479C26.1727 22.5666 27.8946 20.8448 27.8946 15.22C27.8946 14.6604 27.4498 14.2012 26.8902 14.2012C25.6849 14.2012 24.7235 13.2398 24.7235 12.0488C24.7378 10.8579 25.6992 9.8965 26.9045 9.8965ZM12.5269 18.0611C12.5269 18.6207 12.0677 19.0798 11.5081 19.0798C10.9485 19.0798 10.4894 18.6207 10.4894 18.0611V14.2155C10.4894 13.6559 10.9485 13.1968 11.5081 13.1968C12.0677 13.1968 12.5269 13.6559 12.5269 14.2155V18.0611ZM12.5269 8.60509C12.5269 9.1647 12.0677 9.62387 11.5081 9.62387C10.9485 9.62387 10.4894 9.1647 10.4894 8.60509V4.7596C10.4894 4.19999 10.9485 3.74082 11.5081 3.74082C12.0677 3.74082 12.5269 4.19999 12.5269 4.7596V8.60509Z" fill="white"/>
                    </svg>
                    <div className="name">Event<span className="span">ick</span></div>
                </div>
                <ul className="centerpanel">
                    <li className="link">Events</li>
                    
                    <li className="link">Blogs</li>
                    <li className="link">Registered Events</li>
                    {data?.authToken && <li className="link" onClick={()=>navigate("/addevent")}>Add Event</li>}
                    {data?.authToken && <li className="link" onClick={()=>navigate("/addblog")}>Add Blog</li>}
                </ul>
                <ul className="rightpanel">
                    {!data?.authToken ? (
                        <button className="linkbutton" onClick={()=>navigate("/login")}><span>Login</span></button>
                    ):(
                        <ProfileDropdown/>  
                    )}
                </ul>
            </nav>
        </ContentWrapper>
        </div>
    )
}

export default Navbar;