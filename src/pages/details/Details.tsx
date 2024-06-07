import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useAppSelector } from '../../hooks/reduxHooks';
import { apiRequest } from '../../utils/ApicallUtil';
import ContentWrapper from '../../commoncomponent/contentWrapper/contentWrapper';
import { MdPlace } from 'react-icons/md';
import { IoTimeOutline } from 'react-icons/io5';
import Img from '../../commoncomponent/lazyLoadImage/LazyLoadImage';
import Footer from '../../component/detailsFooter/Footer';
import RegistrationForm from '../../component/registrationForm/Register';
import { CardProps } from '../../types';
import "./index.scss";
import Images from '../../component/detailsImages/Images';

function Details() {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<CardProps | null>(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [startDateTime, setStartDateTime] = useState<{ date: string, time: string } | null>(null);
    const [endDateTime, setEndDateTime] = useState<{ date: string, time: string } | null>(null);
    const [registerForm, setRegisterForm] = useState(false);
    const [description, setDescription] = useState<string>("");
    const [userData, setUserData] = useState<any>();

    const updateRegistrationForm = (flag: boolean) => {
        setRegisterForm(flag);
    };

    useEffect(()=>{
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                setDataLoading(true);
                const response = await apiRequest(`event/${id}`, "GET");
                console.log(response.data.data)
                setData(response.data.data);
                setDescription(response.data.data.description);
                const userResponse = await apiRequest(`user/${response.data.data.admin_id}`, "GET");
                setUserData(userResponse.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setDataLoading(false);
            }
        };
        getData();
    }, [id]);

    useEffect(() => {
        function convertDate(datetime: Date | undefined) {
            if (!datetime) return null;
            const momentDate = moment(datetime);
            const date: string = momentDate.format("dddd, MMM DD, YYYY");
            const time: string = momentDate.format("HH:mm");
            return { date, time };
        }

        setStartDateTime(convertDate(data?.start_date));
        setEndDateTime(convertDate(data?.end_date));
    }, [data?.start_date, data?.end_date]);

    return (
        <>
        <ContentWrapper>
            {dataLoading ? (
                <>
                    <div className='Details-header skeleton-header'>
                        <div className='skeleton skeleton-title'></div>
                        <div className='skeleton skeleton-subtitle'></div>
                        <div className='skeleton-image-header'>
                            <div className='skeleton skeleton-image'></div>
                            <div className='skeleton-image-content'>
                                <div className='skeleton skeleton-hosted-by'></div>
                                <div className='skeleton skeleton-name'></div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='detail-content skeleton-detail-content'>
                        <div className='skeleton-left-content'>
                            <div className='skeleton skeleton-img'></div>
                            <div className='skeleton skeleton-section'></div>
                            <div className='skeleton skeleton-section'></div>
                        </div>
                        <div className='skeleton-right-content'>
                            <div className='skeleton skeleton-card'></div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={`Details-header ${registerForm ? 'blurred' : ''}`}>
                        <h1>{data?.name}</h1>
                        <h4>{data?.tagline}</h4>
                        <div data-event-label="Hosted By">
                            <div className='image-header'>
                                <div className='image-section'>
                                    <img src={userData?.profilePhoto} alt="" />
                                </div>
                                <div className='image-content'>
                                    <div>Hosted By</div>
                                    <div className='name'>{userData?.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={`detail-content ${registerForm ? 'blurred' : ''}`}>
                        <div className='left-content'>
                            <Img src={data?.header_img} alt="This is header alt imagec" className=''></Img>
                            <div className='section'>
                                <div className='header'>Details</div>
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            </div>
                            <div className='section'>
                                <Images images = {data?.images}/>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='content-card'>
                                <div className='time'>
                                    <div><IoTimeOutline /></div>
                                    {startDateTime?.date === endDateTime?.date ? (
                                        <div>
                                            <div>{startDateTime?.date}</div>
                                            <div>{startDateTime?.time} to {endDateTime?.time}</div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div>{startDateTime?.date} {startDateTime?.time}</div>
                                            <div>To</div>
                                            <div>{endDateTime?.date} {endDateTime?.time}</div>
                                        </div>
                                    )}
                                </div>
                                <div className='place'>
                                    <div><MdPlace /></div>
                                    <div>{data?.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {registerForm && (
                <div className="modal">
                    <RegistrationForm fee={data?.registration_fee} updateRegistrationForm={updateRegistrationForm} data= {data}/>
                </div>
            )}
        </ContentWrapper>
            <Footer data={data} startDate={startDateTime} updateRegistrationForm={updateRegistrationForm} />
        </>
    );
}

export default Details;
