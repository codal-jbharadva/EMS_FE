
import ContentWrapper from '../../commoncomponent/contentWrapper/contentWrapper';
import "./index.scss"
import { MdPlace } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import Img from '../../commoncomponent/lazyLoadImage/LazyLoadImage';
import Footer from '../../component/detailsFooter/Footer';
import Images from '../../component/detailsImages/Images';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiRequest } from '../../utils/ApicallUtil';

import { CardProps } from '../../types';
import moment from 'moment';

function Details() {
    const {id} = useParams();
    const [data, setData] = useState<CardProps>();
    const [dataLoading, setDataLoading] = useState(true);
    const [dateTime, setDateTime] = useState();

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const response = await apiRequest(`event/${id}`,"GET")
                console.log(response)
                setData(response.data);
              }
              catch(err){
                console.log(err);
              }
              finally{
                setDataLoading(false);
              }
        }
        getData();
    },[])

    useEffect(()=>{
        const momentDate = moment(data?.time);
        console.log(momentDate);
        const date:string = momentDate.format("dddd, MMM DD, YYYY");
        const time:string = momentDate.format("hh:mm");
        console.log(time);
        const datetime = {date, time} 
        setDateTime(datetime);
    },[])

    return (
     dataLoading ? (
        <div className='loadingIcon'>Loading...</div>
     ):
        <>
        <ContentWrapper>
            <div className='Details-header'>
                <h1>{data?.name} </h1>
                <h4>{data?.tagline}</h4>
                <div
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
                </div>
            </div>
            <hr />

            <div className='detail-content'>
                <div className='left-content'>
                    <Img src='https://fastly.picsum.photos/id/71/200/300.jpg?hmac=gynXVv0pTO33farflQTb9mpn-A6N5nt8t0_r9DEDNKU' className=''></Img>
                    <div className='section'>
                        <div className='header'>Details</div>
                        <div>{data?.description}</div>
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