import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import RTE from '../../commoncomponent/RTE/RTE';
import "./index.scss";
import { apiRequest } from '../../utils/ApicallUtil';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

interface AddEventProps {}

const eventTypes = ['Indoor', 'Outdoor', 'Sports', 'meetup', 'Social', 'Dinning']; 

const AddEvent: React.FC<AddEventProps> = () => {
  const navigate = useNavigate();

  const {authToken} = useAppSelector(state=>state.auth);

  const { control, handleSubmit, getValues } = useForm();
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    details: '',
    registrationFee: '',
    type:'',
    place: '',
    address: '',
    startDate: '',
    endDate: '',
    header_image: null,
    images: [],
    currentSection: 1,
  });

  const [selectedEventType, setSelectedEventType] = useState<string>();

  const handleNext = () => {
    setFormData({ ...formData, currentSection: formData.currentSection + 1 });
  };

  const handlePrev = () => {
    setFormData({ ...formData, currentSection: formData.currentSection - 1 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : null });
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files ? Array.from(files) : [] });
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEventType(e.target.value);
    setFormData({ ...formData, type: e.target.value });
  };

  const renderSection = () => {
    switch (formData.currentSection) {
      case 1:
        return (
          <div className='add-event-form-section'>
            <h2>Basic Information</h2>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="tagline">Tagline</label>
              <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="tagline">Event Type</label>
              <select name="type" value={selectedEventType} onChange={handleEventTypeChange}>
                  {eventTypes.map(eventType => (
              <option key={eventType} value={eventType}>{eventType}</option>
            ))}
          </select>
            </div>
            <button onClick={handleNext}>Next</button>
          </div>
        );
      case 2:
        return (
          <div className='add-event-form-section'>
            <h2>Event Details</h2>
            <div className="input-group">
              <RTE label="Details" name="description" control={control} defaultValue={getValues("details")} />
            </div>
            <div className="input-group">
              <label htmlFor="registrationFee">Registration Fee</label>
              <input type="number" name="registrationFee" value={formData.registrationFee} onChange={handleChange} />
            </div>
            <div className='btn-div'>
              <button onClick={handlePrev}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className='add-event-form-section'>
            <h2>Location and Timing</h2>
            <div className="input-group">
              <label htmlFor="place">Place</label>
              <input type="text" name="place" value={formData.place} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="startDate">Start Date</label>
              <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="endDate">End Date</label>
              <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} />
            </div>
            <div className='btn-div'>
              <button onClick={handlePrev}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className='add-event-form-section'>
            <h2>Images and Registration</h2>
            <div className="input-group">
              <label htmlFor="header_image">Header Image</label>
              <input type="file" name="header_image" onChange={handleFileChange} />
            </div>
            <div className="input-group">
              <label htmlFor="images">Other Images</label>
              <input type="file" name="images" multiple onChange={handleMultipleFileChange} />
            </div>
            <div className='btn-div'>
              <button onClick={handlePrev}>Previous</button>
              <button type='submit'>Submit</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const onSubmit = async (data: any) => {
    const formDataToSend = new FormData();

    // Append all form fields
    formDataToSend.append('name', formData.name);
    formDataToSend.append('tagline', formData.tagline);
    formDataToSend.append('details', data.description);
    formDataToSend.append('registration_fee', formData.registrationFee);
    formDataToSend.append('place', formData.place);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('start_date', formData.startDate);
    formDataToSend.append('end_date', formData.endDate);
    formDataToSend.append('type', formData.type);

    // Append files
    if (formData.header_image) {
      console.log(formData.header_image)
      formDataToSend.append('header_image', formData.header_image);
    }

    if (formData.images.length > 0) {
      formData.images.forEach((file: File) => {
        formDataToSend.append(`images`, file);
      });
    }

    // Make the API request
    try {
      const response = await apiRequest('event/add', 'POST', formDataToSend, {authToken: authToken, isFile: true } );
      if(response.status){
        navigate('/')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 className='header-add'>Add Event Form</h1>
      <form className="add-event-form" onSubmit={handleSubmit(onSubmit)}>
        {renderSection()}
      </form>
    </div>
  );
};

export default AddEvent;
