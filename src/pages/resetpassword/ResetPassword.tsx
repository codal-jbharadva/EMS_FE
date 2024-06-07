import { useState, FormEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../utils/ApicallUtil';
import "./index.scss";

const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const {token} = useParams();

  const handlePasswordUpdate = async (e: FormEvent) => {
    e.preventDefault();
    console.log("called")
    if (newPassword !== confirmPassword) {
      console.log("if")
      setIsError(true);
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await apiRequest("user/updatepassword", "POST", { token, newPassword });
      console.log(response)
      if (!response.success) {
        setIsError(true);
        setErrorMessage(response.data);
      } else {
        setIsError(false);
        setErrorMessage('');
        navigate('/login')
        // Optionally navigate to login or other page after success
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="update-password-form">
      <div className="update-password-header">
        <div className={`error-message ${isError ? 'visible' : ''}`}>
          {isError ? errorMessage : ''}
        </div>
        <h2>Update Password</h2>
        <form onSubmit={handlePasswordUpdate}>
          <div className="input-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="update-button">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
