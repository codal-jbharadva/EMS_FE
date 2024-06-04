import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./index.scss"
type props={
    src: string | undefined,
    alt: string | undefined,
    className?: string
}

const Img = ({ src, alt, className } : props) => {
    return (
        <LazyLoadImage
            className={className || "lazyloadclass"}
            alt="This is Alt text"
            effect="blur"
            src={src}
            // onError={(e)=>console.log(e.target)}
        />
    );
};

export default Img;