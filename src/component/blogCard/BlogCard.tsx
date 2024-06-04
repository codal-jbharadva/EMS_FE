import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../../../public/images/image.png";
import './index.scss';

interface PostCardProps {
  data?: {
    id: string;
    title: string;
    description: string;
  };
  loading?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ data, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className='skeleton-card'>
        <div className='skeleton skeleton-card-header'></div>
        <div className='skeleton skeleton-card-title'></div>
        <div className='skeleton skeleton-card-description'></div>
        <div className='skeleton skeleton-card-author'></div>
      </div>
    );
  }

  return (
    <div className='blogcard' onClick={() => navigate(`/blogdetail/${data?.id}`)}>
      <div className='blogcard-header'><img src={image} alt="" /></div>
      <div className='blogcard-title'>{data?.title}</div>
      <div className='blogcard-description'>{data?.description}</div>
      <div className='blogcard-author'>Written by Jayesh Bharadva</div>
    </div>
  );
}

export default PostCard;
