import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import './index.scss';

interface FormData {
    eventName: string;
    description: string;
    date: string;
    mainPhoto: File | null;
    otherPhotos: FileList | null;
    speakers: string;
    place: string;
    address: string;
}

const EventForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        eventName: '',
        description: '',
        date: '',
        mainPhoto: null,
        otherPhotos: null,
        speakers: '',
        place: '',
        address: ''
    });

    const [, forceUpdate] = useState();
    const validator = useRef(new SimpleReactValidator());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files ? files : null });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            console.log(formData);
        } else {
            validator.current.showMessages();
            // Force update to display validation messages
            forceUpdate({});
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        onBlur={() => validator.current.showMessageFor('eventName')}
                    />
                    {validator.current.message('eventName', formData.eventName, 'required')}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={() => validator.current.showMessageFor('description')}
                    />
                    {validator.current.message('description', formData.description, 'required')}
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        onBlur={() => validator.current.showMessageFor('date')}
                    />
                    {validator.current.message('date', formData.date, 'required|date')}
                </div>

                <div className="form-group">
                    <label htmlFor="mainPhoto">Main Photo</label>
                    <input
                        type="file"
                        id="mainPhoto"
                        name="mainPhoto"
                        onChange={handleFileChange}
                        onBlur={() => validator.current.showMessageFor('mainPhoto')}
                    />
                    {validator.current.message('mainPhoto', formData.mainPhoto, 'required')}
                </div>

                <div className="form-group">
                    <label htmlFor="otherPhotos">Other Photos</label>
                    <input
                        type="file"
                        id="otherPhotos"
                        name="otherPhotos"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="speakers">Speakers</label>
                    <input
                        type="text"
                        id="speakers"
                        name="speakers"
                        value={formData.speakers}
                        onChange={handleChange}
                        onBlur={() => validator.current.showMessageFor('speakers')}
                    />
                    {validator.current.message('speakers', formData.speakers, 'required')}
                </div>

                <div className="form-group">
                    <label htmlFor="place">Place</label>
                    <input
                        type="text"
                        id="place"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        onBlur={() => validator.current.showMessageFor('place')}
                    />
                    {validator.current.message('place', formData.place, 'required')}
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onBlur={() => validator.current.showMessageFor('address')}
                    />
                    {validator.current.message('address', formData.address, 'required')}
                </div>

                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;
