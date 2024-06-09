import React from "react";
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

const Footer: React.FC<FooterProps> = ({ data, startDate, updateRegistrationForm }) => {
    const auth = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const handleRegister = () => {
        if (auth?.authToken) {
            updateRegistrationForm(true);
        } else {
            updateRegistrationForm(true);
            navigate("/login", { state: { from: `/details/${data.id}` } });
        }
    };

    const currentDate = new Date();
    const registrationStartDate = new Date(data?.registration_start_date);
    const registrationEndDate = new Date(data?.registration_end_date);
    const eventEndDate = new Date(data?.end_date);
    console.log(registrationEndDate)
    console.log(registrationStartDate)
    console.log(eventEndDate)

    let registrationStatus;
    if (currentDate < registrationStartDate) {
        registrationStatus = "Registration will open soon";
    } else if (currentDate >= registrationStartDate && currentDate <= registrationEndDate) {
        registrationStatus = "Register";
    } else if (currentDate > registrationEndDate && currentDate <= eventEndDate) {
        registrationStatus = "Event is closed";
    } else if (currentDate > eventEndDate) {
        registrationStatus = "Ended";
    }
    console.log(registrationStatus)

    return (
        <footer>
            <ContentWrapper>
                <div className={`footer-content ${data?.completed === 1 ? "" : "header-completed"}`}>
                    <div className="footer-left">
                        <div className="footer-time">{startDate?.date}</div>
                        <div className="footer-name">{data?.name}</div>
                    </div>
                    <div className="footer-right">
                        <div>
                            {data?.registration_fee > 0 ? (
                                <div className="fee">
                                    <div>Registration Fee</div>
                                    <div className="value">
                                        <span>{data?.registration_fee}<FaRupeeSign /></span>
                                    </div>
                                </div>
                            ) : "FREE"}
                        </div>
                        <div>
                            <button className="footer-share-btn">
                                <p>Share <LuShare /></p>
                            </button>
                        </div>
                        <div>
                            <button style={{padding:'20px', width:'fit-content'}}
                                className={`footer-btn ${registrationStatus === "Register" ? "" : "completed"}`}
                                onClick={registrationStatus === "Register" ? handleRegister : undefined}
                                disabled={registrationStatus !== "Register"}
                            >
                                <p>{registrationStatus}</p>
                            </button>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;
