import React, { useState } from 'react';
import "./index.scss"
import { IoMdClose } from "react-icons/io";
import {loadStripe} from '@stripe/stripe-js';
import { CardProps } from '../../types';
import { apiRequest } from '../../utils/ApicallUtil';
import { useAppSelector } from '../../hooks/reduxHooks';

interface registrationFormProps{
  fee:number | undefined,
  updateRegistrationForm: (flag:boolean)=>void,
  data: CardProps
}

const RegistrationForm = ({fee, updateRegistrationForm, data}:registrationFormProps) => {

  const {authToken} = useAppSelector(state=>state.auth);
  console.log(data);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    currentRole: '',
    organizationName: '',
    reasonAttending: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:');
    // Handle form submission, e.g., send data to backend
  };

  const handleClose = ()=>{
    updateRegistrationForm(false);
  }

  const handleFee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stripe = await loadStripe("pk_test_51PNZZDEqEj8PZfPPpYnWzAddH1A5uikuhFmlOgkbnuHkastTtNTJ6ITSoslbTkVbjt5WPkyfE9dXiv3aQ1rKJoZP00RInShcg8");
    const body = {
      amount: fee,
      eventId: data?.id,
      eventName: data?.name,
    }

    const response = await apiRequest('stripe',"POST",body, {authToken:authToken})
    console.log(response.data);
    const session = response.data;
    const result = stripe?.redirectToCheckout({
      sessionId: session.id,
    });
    console.log(result);
    
  };

  return (
    <div className="form-container">
      <IoMdClose className='close-icon' onClick={handleClose}/>
      <h2>Complete your registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First name*</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name*</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="currentRole">Current role*</label>
          <input type="text" id="currentRole" name="currentRole" value={formData.currentRole} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="organizationName">Organization name*</label>
          <input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="reasonAttending">Main reason for attending*</label>
          <input type="text" id="reasonAttending" name="reasonAttending" value={formData.reasonAttending} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <p>This information with your email address will be shared with the organizers.</p>
        </div>
        {fee > 0? (
          <div className="form-group">
            <input  className="payment" type="submit" value="Pay Fee" onClick={handleFee}/>
          </div>
        ):(
          <div className="form-group">
            <input type="submit" value="Submit" onClick={handleSubmit}/>
          </div>
        )}
        
      </form>
    </div>
  );
};

export default RegistrationForm;
