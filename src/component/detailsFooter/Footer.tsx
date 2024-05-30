import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import { CardProps } from "../../types";
import "./index.scss";
import { LuShare } from "react-icons/lu";
import { FaRupeeSign } from "react-icons/fa";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
interface FooterProps {
    data: CardProps;
    startDate: { date: string } | null;
    updateRegistrationForm: (flag: boolean) => void;
}

function Footer({ data, startDate, updateRegistrationForm }: FooterProps) {
    const auth = useAppSelector(state=>state.auth);

    const navigate = useNavigate();

    const handleRegister = () => {
        if(auth?.authToken){
            updateRegistrationForm(true);
        }
        else{
            updateRegistrationForm(true);
            navigate("/login", {state:{from:`/details/${data.id}`}});
        }
    };

    return (
        <footer>
            <ContentWrapper>
                <div className="footer-content">
                    <div className='footer-left'>
                        <div className="footertime">{startDate?.date}</div>
                        <div className="footername">{data?.name}</div>
                    </div>
                    <div className='footer-right'>
                        <div>
                            {data?.registration_fee > 0 ? (
                                <div className="fee">
                                    <div>Registration FEE</div>
                                    <div className="value"><span>{data?.registration_fee}<FaRupeeSign /></span></div>
                                </div>
                            ) : "FREE"}
                        </div>
                        <div><button className='footer-share-btn'><p>Share <LuShare /></p></button></div>
                        <div><button className='footer-btn' onClick={handleRegister}><p>Register</p></button></div>
                    </div>
                </div>
            </ContentWrapper>
        </footer>
    );
}

export default Footer;
