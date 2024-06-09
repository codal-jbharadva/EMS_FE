import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RTE from '../../commoncomponent/RTE/RTE';
import "./index.scss";
import { apiRequest } from '../../utils/ApicallUtil';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import Loader from '../../commoncomponent/loader/Loader';

const eventTypes = ['Indoor', 'Outdoor', 'Sports', 'Meetup', 'Social', 'Dining'];

const schema = yup.object().shape({
  name: yup.string().required('Name is required').max(100, 'Name should be less than 100 characters'),
  tagline: yup.string().required('Tagline is required').max(100, 'Tagline should be less than 100 characters'),
  type: yup.string().required('Event type is required'),
  details: yup.string().required('Details are required'),
  registrationFee: yup.number().required('Registration fee is required').min(0, 'Registration fee should be a positive number'),
  place: yup.string().required('Place is required').max(100, 'Place should be less than 100 characters'),
  address: yup.string().required('Address is required').max(250, 'Address should be less than 250 characters'),
  registrationStartDate: yup.date().required('Registration start date is required').typeError('Invalid date'),
  registrationEndDate: yup.date()
    .required('Registration end date is required')
    .typeError('Invalid date')
    .min(yup.ref('registrationStartDate'), 'Registration end date should be after registration start date'),
  startDate: yup.date()
    .required('Start date is required')
    .typeError('Invalid date')
    .min(yup.ref('registrationEndDate'), 'Start date should be after registration end date'),
  endDate: yup.date()
    .required('End date is required')
    .typeError('Invalid date')
    .min(yup.ref('startDate'), 'End date should be after start date'),
});

const AddEvent: React.FC = () => {
  const navigate = useNavigate();
  const { authToken } = useAppSelector(state => state.auth);
  const { control, handleSubmit, setValue, formState: { errors }, register, getValues } = useForm({
    resolver: yupResolver(schema)
  });

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    details: '',
    registrationFee: '',
    type: 'Meetup',
    place: '',
    address: '',
    startDate: '',
    endDate: '',
    header_image: null,
    images: [],
    registrationStartDate:'',
    registrationEndDate: '',
  });

  const [loader, setLoader] = useState(false);

  const clearError = (fieldName: string) => {
    // Clear error message for the specified field
    // @ts-ignore
    errors[fieldName] && delete errors[fieldName];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // @ts-ignore
    setValue(name, value);
    clearError(name);
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
    clearError('type');
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
    formDataToSend.append('registration_start_date', data.registrationStartDate);
    formDataToSend.append('registration_end_date', data.registrationEndDate);

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
            <label htmlFor="name">Event Name<sup>*</sup></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              maxLength={100}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="tagline">Event Tagline<sup>*</sup></label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className={errors.tagline ? 'error' : ''}
              maxLength={100}
            />
            {errors.tagline && <p className="error-message">{errors.tagline.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="type">Event Type<sup>*</sup></label>
            <select
              name="type"
              value={formData.type}
              onChange={handleEventTypeChange}
              className={errors.type ? 'error' : ''}
            >
              <option value="">Select Event Type<sup>*</sup></option>
              {eventTypes.map(eventType => (
                <option key={eventType} value={eventType}>{eventType}</option>
              ))}
            </select>
            {errors.type && <p className="error-message">{errors.type.message}</p>}
          </div>
        </div>

        <div className='add-event-form-section'>
          <h2>Event Details</h2>
          <div className="input-group">
            <RTE label="Details" name="details" control={control} defaultValue={getValues("details")} />
            {errors.details && <p className="error-message">{errors.details.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="registrationFee">Registration Fee(If Any)<sup>*</sup></label>
            <input
              type="number"
              name="registrationFee"
              value={formData.registrationFee}
              onChange={handleChange}
              className={errors.registrationFee ? 'error' : ''}
              min={0}
            />
            {errors.registrationFee && <p className="error-message">{errors.registrationFee.message}</p>}
          </div>
        </div>

        <div className='add-event-form-section'>
          <h2>Location and Timing</h2>
          <div className="input-group">
            <label htmlFor="place">Place<sup>*</sup></label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className={errors.place ? 'error' : ''}
              maxLength={100}
            />
            {errors.place && <p className="error-message">{errors.place.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="address">Address<sup>*</sup></label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
              maxLength={250}
            />
            {errors.address && <p className="error-message">{errors.address.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="registrationStartDate">Registration Start Date<sup>*</sup></label>
            <input
              type="datetime-local"
              name="registrationStartDate"
              value={formData.registrationStartDate}
              onChange={handleChange}
              className={errors.registrationStartDate ? 'error' : ''}
            />
            {errors.registrationStartDate && <p className="error-message">{errors.registrationStartDate.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="registrationEndDate">Registration End Date<sup>*</sup></label>
            <input
              type="datetime-local"
              name="registrationEndDate"
              value={formData.registrationEndDate}
              onChange={handleChange}
              className={errors.registrationEndDate ? 'error' : ''}
            />
            {errors.registrationEndDate && <p className="error-message">{errors.registrationEndDate.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="startDate">Start Date<sup>*</sup></label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={errors.startDate ? 'error' : ''}
            />
            {errors.startDate && <p className="error-message">{errors.startDate.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="endDate">End Date<sup>*</sup></label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={errors.endDate ? 'error' : ''}
            />
            {errors.endDate && <p className="error-message">{errors.endDate.message}</p>}
          </div>
        </div>

        <div className='add-event-form-section'>
          <h2>Images and Registration</h2>
          <div className="input-group">
            <label htmlFor="header_image">Thumbnail Image<sup>*</sup></label>
            <input
              type="file"
              name="header_image"
              onChange={handleFileChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="images">Other Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleMultipleFileChange}
            />
          </div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
