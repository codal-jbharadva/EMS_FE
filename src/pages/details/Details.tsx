
import ContentWrapper from '../../commoncomponent/contentWrapper/contentWrapper';
import "./index.scss"
import { MdPlace } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import Img from '../../commoncomponent/lazyLoadImage/LazyLoadImage';
import Footer from '../../component/detailsFooter/Footer';
import Images from '../../component/detailsImages/Images';


function Details() {
    return (
        <>
        <ContentWrapper>
            <div className='Details-header'>
                <h1>PGD-AI Study Circle - Data Structure and Algorithms (Sessions 1-7) </h1>
                <a href="https://s3-alpha-sig.figma.com/img/8ef1/1021/46a82ab4161a28047f59741b4350bbdf?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LhI7CTFsQBpwLVr3mXtBgVK8oO5dYou-QqRNixC~mA03hbUb9Q3pqTJN98x~XkOBM7trZHszLJz0NnPVcfB1tVq~2qaycCMHo8SvkCgUI33ZgIwD6uKSaQb2H86VBR9C9qdPtXWele2fMYspqwbKO3Ap-yZ-35Yjj~avH5gkB5cFB6dVlNdWmA~X3oEBMBSupKmFP~uYJvkHK7S~poVrfvSGFIhpJUDsZtF3X8KgS4QgNYP7vveTpw0UwIIMkcNA-og927wBeMCjC1j5zGZsdn7jtr4lV8vPmzr2b8QcQsW89jcWrNqp4vyS8JI8jBen6n8wk~Gz-6qxEaB7BKGOog__"
                    data-event-label="Hosted By"
                >
                    <div className='image-header'>
                        <div className='image-section'>
                            <img 
                                src="https://s3-alpha-sig.figma.com/img/8ef1/1021/46a82ab4161a28047f59741b4350bbdf?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LhI7CTFsQBpwLVr3mXtBgVK8oO5dYou-QqRNixC~mA03hbUb9Q3pqTJN98x~XkOBM7trZHszLJz0NnPVcfB1tVq~2qaycCMHo8SvkCgUI33ZgIwD6uKSaQb2H86VBR9C9qdPtXWele2fMYspqwbKO3Ap-yZ-35Yjj~avH5gkB5cFB6dVlNdWmA~X3oEBMBSupKmFP~uYJvkHK7S~poVrfvSGFIhpJUDsZtF3X8KgS4QgNYP7vveTpw0UwIIMkcNA-og927wBeMCjC1j5zGZsdn7jtr4lV8vPmzr2b8QcQsW89jcWrNqp4vyS8JI8jBen6n8wk~Gz-6qxEaB7BKGOog__" 
                                alt="" 
                                className='person-img'
                            />
                        </div>
                        <div className='image-content'>
                            <div>Hosted By</div>
                            <div className='name'>Jayesh Bharadva</div>
                        </div>
                    </div>
                </a>
            </div>
            <hr />

            <div className='detail-content'>
                <div className='left-content'>
                    <Img src='https://s3-alpha-sig.figma.com/img/8ef1/1021/46a82ab4161a28047f59741b4350bbdf?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LhI7CTFsQBpwLVr3mXtBgVK8oO5dYou-QqRNixC~mA03hbUb9Q3pqTJN98x~XkOBM7trZHszLJz0NnPVcfB1tVq~2qaycCMHo8SvkCgUI33ZgIwD6uKSaQb2H86VBR9C9qdPtXWele2fMYspqwbKO3Ap-yZ-35Yjj~avH5gkB5cFB6dVlNdWmA~X3oEBMBSupKmFP~uYJvkHK7S~poVrfvSGFIhpJUDsZtF3X8KgS4QgNYP7vveTpw0UwIIMkcNA-og927wBeMCjC1j5zGZsdn7jtr4lV8vPmzr2b8QcQsW89jcWrNqp4vyS8JI8jBen6n8wk~Gz-6qxEaB7BKGOog__' className=''></Img>
                    <div className='section'>
                        <div className='header'>Details</div>
                        <div>We plan to cover with initially C and later jump to Object Orientation with Python, Java etc. as needed for PGD-AI prep work. Note current C based Algorithm and Data Structure may include some C++ like or C plus object orientation. We will use “Mastering Algorithm with C” by Kylen Loudon of O’Reilly publication as our reference book Starting with Chapters 4 - Analysis of Algorithm and Chapter 5 - Linked Lists.
Later sessions will cover Chapter 6/7 - Stacks & Queues / Sets, Chapter 8/9 Hash Table & Trees Chapter 10/11 Heap & Priority Queues, Chapter 12/13 Sorting & Searching / Numerical Method, Chapter 14/15 Data Compression/Data Encryption, Chapter 16/17 Graph Algorithms/Geometric Algorithms.</div>
                    </div>
                    
                    <div className='section'>
                        <Images></Images>
                    </div>
                </div>
                <div className='right-content'>
                    <div className='content-card'>
                        <div className='time'>
                            <div><IoTimeOutline /></div>
                            <div>Wednesday, May 15, 2024
                                <div>8:00 PM to 9:00 PM IST</div>
                            </div>
                        </div>
                        <div className='place'>
                            <div><MdPlace/></div>
                            <div>2-Jasraj Nagar, B/H Hortune Hotel, Rajkot, Gujarat, 360004</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </ContentWrapper>
        <Footer></Footer>
        </>
       
    );
}

export default Details;