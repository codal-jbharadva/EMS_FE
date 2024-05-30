import ContentWrapper from '../../commoncomponent/contentWrapper/contentWrapper';
import "./index.scss";
import { MdPlace } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import Img from '../../commoncomponent/lazyLoadImage/LazyLoadImage';
import Footer from '../../component/detailsFooter/Footer';
import Images from '../../component/detailsImages/Images';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiRequest } from '../../utils/ApicallUtil';
import RegistrationForm from '../../component/registrationForm/Register';
import { CardProps } from '../../types';
import moment from 'moment';
import { useAppSelector } from '../../hooks/reduxHooks';

import DOMPurify from 'dompurify';

function Details() {
    const stateData = useAppSelector(state => state.auth);
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<CardProps | null>(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [startDateTime, setStartDateTime] = useState<{ date: string, time: string } | null>(null);
    const [endDateTime, setEndDateTime] = useState<{ date: string, time: string } | null>(null);
    const [registerForm, setRegisterForm] = useState(false);
    const [description, setDescription] = useState<string>("");

    const updateRegistrationForm = (flag: boolean) => {
        setRegisterForm(flag);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await apiRequest(`event/${id}`, "GET");
                console.log(response)
                setData(response.data.data);
                setDescription(response.data.data.description);
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
        dataLoading ? (
            <div className='loadingIcon'>Loading...</div>
        ) : (
            <>
                <ContentWrapper>
                    <div className={`Details-header ${registerForm ? 'blurred' : ''}`}>
                        <h1>{data?.name}</h1>
                        <h4>{data?.tagline}</h4>
                        <div data-event-label="Hosted By">
                            <div className='image-header'>
                                <div className='image-section'>
                                    {/* Placeholder for image */}
                                </div>
                                <div className='image-content'>
                                    <div>Hosted By</div>
                                    <div className='name'>jayesh</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={`detail-content ${registerForm ? 'blurred' : ''}`}>
                        <div className='left-content'>
                            <Img src={data?.header_img} className=''></Img>
                            <div className='section'>
                                <div className='header'>Details</div>
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            </div>
                            <div className='section'>
                                {/* <Images images = {data?.}/> */}
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
                </ContentWrapper>
                {registerForm && (
                    <div className="modal">
                        <RegistrationForm fee={data?.registration_fee} updateRegistrationForm={updateRegistrationForm}/>
                    </div>
                )}
                <Footer data={data} startDate={startDateTime} updateRegistrationForm={updateRegistrationForm} />
            </>
        )
    );
}

export default Details;
