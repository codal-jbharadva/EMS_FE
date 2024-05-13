import { FC } from "react"
import "./index.scss"
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";

const Brand:FC = ()=>{
    return (
        <ContentWrapper>
            <div className="BrandHeader">
                <header>Join these brands</header>
                <p>We've had the pleasure of working with industry-defining brands. These are just some of them.</p>
            </div>
        </ContentWrapper>
    )
}

export default Brand;