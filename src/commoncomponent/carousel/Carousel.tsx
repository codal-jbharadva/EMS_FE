import { useState } from 'react';
import "./index.scss";
type props = {
    images : string[]
}

function Carousel({images}:props) {

    const [activeImage, setActiveImage] = useState(Number);

    // const nextSlide = ()=>{
    //     setActiveImage((prevIndex)=>
    //         prevIndex!==undefined && prevIndex === images.length - 1 ? 0 : prevIndex + 1
    //     )
    // }

    // const prevSlide = () => {
    //     setActiveImage((prevIndex) =>
    //       prevIndex === 0 ? images.length - 1 : prevIndex - 1
    //     );
    // };

    setTimeout(()=>{
        setActiveImage((prevIndex) =>  (prevIndex + 1) % images.length)
    }, 5000)

    return (
        <div className='carousel'>
            <img src={images[activeImage]} alt="This is Event Image" />
        </div>
    );
}

export default Carousel;