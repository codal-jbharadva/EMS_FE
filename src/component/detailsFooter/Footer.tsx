import { DiVim } from "react-icons/di";
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import { CardProps } from "../../types";
import "./index.scss"
import { LuShare } from "react-icons/lu";
import { FaRupeeSign } from "react-icons/fa";

function Footer({data, startDate}: {data: CardProps, startDate:{date:string}}) {
    return (
        <footer>
                <ContentWrapper>
                    <div className="footer-content">
                    <div className='footer-left'>
                        <div className="footertime">{startDate?.date}</div>
                        <div className="footername">{data?.name} </div>
                    </div>
                    <div className='footer-right'>
                        <div>{data?.registration_fee > 0 ? (
                            <div className="fee">
                                <div>Registration FEE</div>
                                <div className="value"><span>{data?.registration_fee}<FaRupeeSign /></span></div>
                            </div>
                        ):"FREE"}
                    </div>
                        {/* <div>Save Button</div> */}
                        <div><button className='footer-share-btn'><p>Share <LuShare /></p></button></div>
                        <div><button className='footer-btn'><p>Attend Online</p></button></div>
                    </div>
                    </div>  
            </ContentWrapper>
         </footer>
    );
}

export default Footer;