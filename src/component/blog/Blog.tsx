import { FC } from "react"
import "./index.scss"
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import Card from "../../commoncomponent/cardComponent/card";
const arr:number[] = [1,2,3];
const Blog:FC =()=>{
    return(
        <ContentWrapper>
            <div className="blog">
                <header>Blog</header>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium laborum quae.</p>
                <div className="cards">
                {arr.map(()=>{
                    return <Card/>
                })}
            </div>
            <div className="btndiv">
                <button className="morebtn"><p>Load More</p></button>
            </div>
            </div>

        </ContentWrapper>
    )
}

export default Blog;