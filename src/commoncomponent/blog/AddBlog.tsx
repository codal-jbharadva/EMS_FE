import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import RTE from '../../commoncomponent/RTE/RTE';
import "./index.scss";
import { apiRequest } from '../../utils/ApicallUtil';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

interface AddBlogProps {}

const AddBlog: React.FC<AddBlogProps> = () => {
  const navigate = useNavigate();
  const { authToken } = useAppSelector(state => state.auth);

  const { control, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    coverImage: null,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValue(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : null });
  };

  const onSubmit = async (data: any) => {
    const formDataToSend = new FormData();

    // Append all form fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', data.content);
    formDataToSend.append('slug', formData.slug);
    formDataToSend.append("description", formData.description);

    // Append files
    if (formData.coverImage) {
      formDataToSend.append('coverImage', formData.coverImage);
    }

    // Make the API request
    try {
      const response = await apiRequest('blog/add', 'POST', formDataToSend, { authToken: authToken, isFile: true });
      if (response.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 className='header-add'>Add Blog Form</h1>
      <form className="add-blog-form" onSubmit={handleSubmit(onSubmit)}>
        <div className='add-blog-form-section'>
          <h2>Blog Information</h2>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              maxLength={100}
              required 
            />
            <span>{100 - formData.title.length} characters remaining</span>
            {errors.title && <p className="error">Title is required and should be less than 100 characters</p>}
          </div>
          <div className="input-group">
            <label htmlFor="slug">Slug</label>
            <input 
              type="text" 
              name="slug" 
              value={formData.slug} 
              onChange={handleChange} 
              maxLength={70} 
              required
            />
            <span>{70 - formData.slug.length} characters remaining</span>
            {errors.slug && <p className="error">Slug should be less than 70 characters</p>}
          </div>
        </div>
        <div className='add-blog-form-section'>
          <h2>Blog Content</h2>
          <div className="input-group">
            <label htmlFor="description">Short Description</label>
            <input 
              type="text" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              maxLength={250}
              required 
            />
            <span>{250 - formData.description.length} characters remaining</span>
            {errors.description && <p className="error">Description should be less than 250 characters</p>}
          </div>
          <div className="input-group">
          <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            {errors.content && <p className="error">Content is required</p>}
          </div>
          <div className="input-group">
            <label htmlFor="coverImage">Cover Image</label>
            <input type="file" name="coverImage" onChange={handleFileChange} required />
          </div>
          <div className='btnDiv'>
            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
