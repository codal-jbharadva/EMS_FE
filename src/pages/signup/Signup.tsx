import React, { FormEvent, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../utils/ApicallUtil';
import ReactCrop, { Crop, PixelCrop, centerCrop, convertToPercentCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import "./index.scss";
import setCanvasPreview from "../../utils/setCanvasPreview"
import Loader from '../../commoncomponent/loader/Loader';
const MIN_DIMENTION = 130;
const ASPECT_RETIO = 1;

const SignUpForm = () => {
  const imgRef = useRef(null);
  const previewRef = useRef(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [croppedPhoto, setCroppedPhoto] = useState<File | null>(null);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [role, setRole] = useState<string>('user');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [crop, setCrop] = useState<Crop>();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsError(true);
      setErrorMessage("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (croppedPhoto){
      formData.append('profilePhoto', croppedPhoto);
    } 
    formData.append('password', password);
    formData.append('number', number);
    formData.append('role', role);

    try {
      setDataLoading(true);
      const response = await apiRequest(
        "user/add",
        "POST",
        formData,
        { isFile: true, isSignUp: true }
      );
      if (!response.success) {
        setIsError(true);
        setErrorMessage(response.data);
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
    finally{
      setDataLoading(false);
    }
  };

  const handleCropImage = () => {
    if (imgRef.current && previewRef.current && crop) {
      // @ts-ignore
      setCanvasPreview(imgRef.current, previewRef.current, convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height));
      // @ts-ignore
      const dataURL = previewRef.current.toDataURL('image/jpeg');
      // Convert data URL to Blob
      const byteString = atob(dataURL.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: 'image/jpeg' });
      const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
      console.log(file);
      setCroppedPhoto(file);
    }
  };

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      console.log(reader)
      setCroppedPhoto(null);
    }
  };

  const onImageLoad = (e:React.ChangeEvent<HTMLImageElement>)=>{
    const {width, height, naturalHeight, naturalWidth} = e.currentTarget;


    if(naturalHeight < MIN_DIMENTION || naturalWidth < MIN_DIMENTION){
      setErrorMessage("Image must be at least 130 X 130 Pixels.");
      setImageSrc("");
      return;
    }

    const cropWidthPercent = (MIN_DIMENTION / width) * 100;
    const crop = makeAspectCrop({
      unit:"%",
      width: cropWidthPercent,
      },
        ASPECT_RETIO,
        width,
        height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  }

  if(dataLoading){
    return(
      <div className='loader-icon'>
        <Loader/>
      </div>
    )
  }

  return (
    <div className="login-form">
      <div className="login-header">
        <div className={`error-message ${isError ? 'visible' : ''}`}>
          {isError ? errorMessage : ''}
        </div>
        <h2>Sign Up</h2>
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
      <form >
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="profilePhoto">Profile Photo</label>
          <input
            type="file"
            id="profilePhoto"
            onChange={handleImageSelection}
          />
        </div>
        {imageSrc && (
          <div className='cropImage'>
            <ReactCrop
            crop={crop}
            circularCrop
            keepSelection
            aspect={ASPECT_RETIO}
            minWidth={MIN_DIMENTION}
            onChange={(PixelCrop, percentageCrop) => setCrop(percentageCrop)}
          >
            <img ref={imgRef} src={imageSrc} alt="" onLoad={onImageLoad}/>
          </ReactCrop>
          <button className='' onClick={handleCropImage}>Crop Image</button>
          </div>
        )}
        {
          crop && (
            <canvas
            ref={previewRef}
            style={{
              height:130,
              width:130,
              objectFit:"contain",
              borderRadius: "50%",
            }}/>
          )
        }
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="number">Mobile Number</label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <div className="input-group role">
          <label>Role</label>
          <div>
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="user">User</label>
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="admin">Admin</label>
          </div>
        </div>
        <button type="submit" className="login-button" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
