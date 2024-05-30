import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../utils/ApicallUtil';
import "./index.scss";

const SignUpForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [role, setRole] = useState<string>('student');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

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
    if (profilePhoto) formData.append('profilePhoto', profilePhoto);
    formData.append('password', password);
    formData.append('number', number);
    formData.append('role', role);

    try {
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
  };

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
      <form onSubmit={handleSignUp}>
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
            onChange={(e) => setProfilePhoto(e.target.files![0])}
          />
        </div>
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
            <label htmlFor="student">User</label>
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
        <button type="submit" className="login-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
