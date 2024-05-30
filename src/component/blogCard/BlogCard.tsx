import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import image  from "../../../public/images/image.png"
import './index.scss';

function PostCard({data}) {
  const navigate = useNavigate()
    console.log(data)
  return (
    // <Link to={`/blogdetail/${data.id}`}>
      <div className='blogcard'>
        <div className='blogcard-header'><img src={image} alt="" /></div>
        <div className='blogcard-title'>{data?.title}</div>
        <div className='blogcard-description'>{data?.description}</div>
        <div className='blogcard-author'>Jayesh Bharadva</div>
      </div>
    // </Link>
  );
}

export default PostCard;
