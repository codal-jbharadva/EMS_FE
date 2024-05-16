// import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import "./index.scss"

function Footer() {
    return (
        <footer>
                <div className='footer-left'>
                    <div>8:00 PM to 9:00 PM IST</div>
                    <div>PGD-AI Study Circle - Data Structure and Algorithms (Sessions 1-7) </div>
                </div>
                <div className='footer-right'>
                    <div>FREE</div>
                    <div>Save Button</div>
                    <div>Share Button</div>
                    <div><button className='footer-btn'><p>Attend Online</p></button></div>
                </div>
        </footer>
    );
}

export default Footer;