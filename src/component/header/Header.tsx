import { FC } from "react";
import "./index.scss";
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import Carousel from "../../commoncomponent/carousel/Carousel";
const images: string[] = ["https://i.pinimg.com/736x/d5/0b/d2/d50bd25b9cc865495b31a97e7a1eed18.jpg",
 "https://s3-alpha-sig.figma.com/img/f5f1/b11b/8ba389952b970f32811a8af061463b07?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jxjp1n426noSB415MO6SwxwzEOya13tLeN7kc-nJxoq5jefY~uRj0xyVtY25UPPmF0EnW5peW75lg2rusBHqs7IGCyXvYIvWPu2ASXpBZMdofCPaEwzF-cjC3qYAa7hGoF1ntvBC5iKiAqEcwN~i87l7z52rnSOaNSV6R0fBd8MFoiTJ8hQFwnk60z6HJuMTZAxVSOKd15bK~iM2YeeXcPcufQ~7EdLM3PehDiNVNl02isGvA61ynvso7cPy~J5cw4Qe8MgHeM8dgNxSqDu5cIy4ViRE0aRv6ZPRQZhr766EUq-yogK7oPmLBqqOQyYrjmMISNthUgWD-7VF1j9RGA__",
  "https://s3-alpha-sig.figma.com/img/18d7/6de2/6016c6c99736121bd57a8916cfca3274?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FVh4mTcTjkkIxvebMDO1t4iawbFeizauZzVAQykYCdPHjv3~RRwihbckR5Uw4Z8sKHM8v8kIpYC~m5enTcYRjTKOV5LBGIcc1Xr55MFsgcEBxhG3Vv4vfPnfTIl9nncrsbwljaEBl55xkw3BU8WdyTAth8j85c0AyTctG7g543XCn4xLjFy7axGbn8hEEOOJ2vmQA7zqqCBADVh0Fazg5oBmtVbylntzH1pUF3YxxAt80BbiBoiSTPf4MU8KICJL-cjEl-k7vGzBQ~VMBIj5-Y-9FMbFxoJ0Bp9WskvCO2Uv8fJylNDy8l3pmATVO2-liW3jyiOL3B6-teF5LasAKA__"];

const Header:FC =()=>{
    return(
        <div className="main-header">
            <ContentWrapper>
            <main>
                <div className="hero-image">
                    {/* <Carousel images={images}></Carousel> */}
                    <img src="https://i.pinimg.com/736x/d5/0b/d2/d50bd25b9cc865495b31a97e7a1eed18.jpg" alt="" />
                </div>
                <div className="content">
                    <header>
                        SBS MTV The Kpop Show Ticket  Package
                    </header>
                    <p>
                        Look no further! Our SBS The Show tickets are the simplest way for you to experience a live Kpop recording.
                    </p>
                    <button className="btn1"><p>Get Ticket</p></button>
                    <button className="btn2"><p>Learn More</p></button>
                </div>
            </main>
        </ContentWrapper>
        </div>
    )
}

export default Header;