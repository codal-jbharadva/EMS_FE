import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import RTE from '../../commoncomponent/RTE/RTE';
import "./index.scss";
import { apiRequest } from '../../utils/ApicallUtil';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import Loader from '../../commoncomponent/loader/Loader';

interface AddEventProps {}

const eventTypes = ['Indoor', 'Outdoor', 'Sports', 'Meetup', 'Social', 'Dining'];

const AddEvent: React.FC<AddEventProps> = () => {
  const navigate = useNavigate();
  const { authToken } = useAppSelector(state => state.auth);
  const { control, handleSubmit, getValues, setValue, formState: { errors }, register } = useForm();
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    details: '',
    registrationFee: '',
    type: '',
    place: '',
    address: '',
    startDate: '',
    endDate: '',
    header_image: null,
    images: [],
  });

  const [loader, setLoader] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValue(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : null });
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files ? Array.from(files) : [] });
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, type: e.target.value });
    setValue('type', e.target.value);
  };

  const onSubmit = async (data: any) => {
    const formDataToSend = new FormData();

    // Append all form fields
    formDataToSend.append('name', data.name);
    formDataToSend.append('tagline', data.tagline);
    formDataToSend.append('details', data.details);
    formDataToSend.append('registration_fee', data.registrationFee);
    formDataToSend.append('place', data.place);
    formDataToSend.append('address', data.address);
    formDataToSend.append('start_date', data.startDate);
    formDataToSend.append('end_date', data.endDate);
    formDataToSend.append('type', data.type);

    // Append files
    if (formData.header_image) {
      formDataToSend.append('header_image', formData.header_image);
    }

    if (formData.images.length > 0) {
      formData.images.forEach((file: File) => {
        formDataToSend.append('images', file);
      });
    }

    // Make the API request
    try {
      setLoader(true);
      const response = await apiRequest('event/add', 'POST', formDataToSend, { authToken: authToken, isFile: true });
      if (response.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      {loader && (
        <div className='loader-icon'>
          <Loader />
        </div>
      )}
      <h1 className='header-add'>Add Event Form</h1>
      <form className="add-event-form" onSubmit={handleSubmit(onSubmit)}>
        <div className='add-event-form-section'>
          <h2>Basic Information</h2>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={100}
            />
            {errors.name && <p className="error">Name is required and should be less than 100 characters</p>}
          </div>
          <div className="input-group">
            <label htmlFor="tagline">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              required
              maxLength={100}
            />
            {errors.tagline && <p className="error">Tagline is required and should be less than 100 characters</p>}
          </div>
          <div className="input-group">
            <label htmlFor="type">Event Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleEventTypeChange}
              required
            >
              <option value="">Select Event Type</option>
              {eventTypes.map(eventType => (
                <option key={eventType} value={eventType}>{eventType}</option>
              ))}
            </select>
            {errors.type && <p className="error">Event type is required</p>}
          </div>
        </div>

        <div className='add-event-form-section'>
          <h2>Event Details</h2>
          <div className="input-group">
          <RTE label="Details" name="description" control={control} defaultValue={getValues("details")} />
            {errors.details && <p className="error">Details are required</p>}
          </div>
          <div className="input-group">
            <label htmlFor="registrationFee">Registration Fee</label>
            <input
              type="number"
              name="registrationFee"
              value={formData.registrationFee}
              onChange={handleChange}
              required
              min={0}
            />
            {errors.registrationFee && <p className="error">Registration fee is required and should be a positive number</p>}
          </div>
        </div>

        <div className='add-event-form-section'>
          <h2>Location and Timing</h2>
          <div className="input-group">
            <label htmlFor="place">Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
              maxLength={100}
            />
            {errors.place && <p className="error">Place is required and should be less than 100 characters</p>}
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              maxLength={250}
            />
            {errors.address && <p className="error">Address is required and should be less than 250 characters</p>}
          </div>
          <div className="input-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
            {errors.startDate && <p className="error">Start date is required</p>}
          </div>
          <div className="input-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
            {errors.endDate && <p className="error">End date is required</p>}
          </div>
        </div>

        <div className='add-event-form-section'>
          <h2>Images and Registration</h2>
          <div className="input-group">
            <label htmlFor="header_image">Header Image</label>
            <input
              type="file"
              name="header_image"
              onChange={handleFileChange}
              required
            />
            {errors.header_image && <p className="error">Header image is required</p>}
          </div>
          <div className="input-group">
            <label htmlFor="images">Other Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleMultipleFileChange}
              required
            />
            {errors.images && <p className="error">At least one image is required</p>}
          </div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
