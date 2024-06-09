import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RTE from '../../commoncomponent/RTE/RTE';
import "./index.scss";
import { apiRequest } from '../../utils/ApicallUtil';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';

interface AddBlogProps {}

const schema = yup.object().shape({
  title: yup.string().required('Title is required').max(100, 'Title should be less than 100 characters'),
  description: yup.string().required('Description is required').max(250, 'Description should be less than 250 characters'),
  content: yup.string().required('Content is required')
});

const AddBlog: React.FC<AddBlogProps> = () => {
  const navigate = useNavigate();
  const { authToken } = useAppSelector(state => state.auth);

  const [dataLoading, setDataLoading] = useState(false);

  const { control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
    coverImage: null
  });

  const clearError = (fieldName: string) => {
    // Clear error message for the specified field
    // @ts-ignore
    errors[fieldName] && delete errors[fieldName];
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
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
    
    const onSubmit = async (data: any) => {
      const formDataToSend = new FormData();
      console.log(data);
    // Append all form fields
    formDataToSend.append('title', data.title);
    formDataToSend.append('content', data.content);
    formDataToSend.append("description", data.description);

    const slug = generateSlug(data.title);
    formDataToSend.append("slug", slug);

    // Append files
    if (formData.coverImage) {
      formDataToSend.append('coverImage', formData.coverImage);
    }

    // Make the API request
    try {
      setDataLoading(true);
      const response = await apiRequest('blog/add', 'POST', formDataToSend, { authToken: authToken, isFile: true });
      if (response.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    finally{
      setDataLoading(false);
    }
  };

  return (
    <div>
      {dataLoading && (
        <div className='loader-icon'>
          <Loader />
        </div>
      )}
      <h1 className='header-add'>Add Blog Form</h1>
      <form className="add-blog-form" onSubmit={handleSubmit(onSubmit)}>
        <div className='add-blog-form-section'>
          <h2>Blog Information</h2>
          <div className={`input-group ${errors.title ? 'error' : ''}`}>
            <label htmlFor="title">Title<sup>*</sup></label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              maxLength={100}
            />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>
          <div className={`input-group ${errors.description ? 'error' : ''}`}>
            <label htmlFor="description">Short Description<sup>*</sup></label>
            <input 
              type="text" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              maxLength={250}
            />
            {errors.description && <p className="error">{errors.description.message}</p>}
          </div>
        </div>
        <div className='add-blog-form-section'>
          <h2>Blog Content</h2>
          <div className={`input-group ${errors.content ? 'error' : ''}`}>
            <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            {errors.content && <p className="error">{errors.content.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="coverImage">Cover Image<sup>*</sup></label>
            <input type="file" name="coverImage" onChange={handleFileChange}/>
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
