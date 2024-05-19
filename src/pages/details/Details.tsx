import React from 'react';
import ContentWrapper from '../../commoncomponent/contentWrapper/contentWrapper';
import "./index.scss"

function Details() {
    return (
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
                            <div><span>Jayesh Bharadva</span></div>
                        </div>
                    </div>
                </a>
            </div>
        </ContentWrapper>
    );
}

export default Details;