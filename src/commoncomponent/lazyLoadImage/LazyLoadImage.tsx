import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type props={
    src: string,
    className?: string
}

const Img = ({ src, className } : props) => {
    return (
        <LazyLoadImage
            className={className || ""}
            alt="This is Alt text"
            effect="blur"
            src={src}
            // onError={(e)=>console.log(e.target)}
        />
    );
};

export default Img;