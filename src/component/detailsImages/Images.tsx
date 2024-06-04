import "./index.scss"
import Img from "../../commoncomponent/lazyLoadImage/LazyLoadImage";

function Images({images}: string[]) {   
    return (
        <>
            <div className="images-header">
                <div className="header">Photos({images?.length})</div>
                <div><a href="">See All</a></div>
            </div>
            <div className="images">
                {images.map((element : string)=>(
                    <Img src={element} alt="This is alt text"/>
                ))}
            </div>
        </>
    );
}

export default Images;