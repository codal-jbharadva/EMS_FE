import { useState, FormEvent } from 'react';
import { apiRequest } from '../../utils/ApicallUtil';
import "./index.scss";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiRequest("user/forgotpassword", "POST", { email });
      if (!response.success) {
        setIsError(true);
        setErrorMessage(response.data);
      } else {
        setIsEmailSubmitted(true);
        setIsError(false);
        setErrorMessage('');
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="forgot-password-form">
      <div className="forgot-password-header">
        <div className={`error-message ${isError ? 'visible' : ''}`}>
          {isError ? errorMessage : ''}
        </div>
        <h2>Forgot Password</h2>
        {isEmailSubmitted ? (
          <p className="success-message">Check your email for further instructions</p>
        ) : (
          <>
            <p>Enter your email to reset password</p>
            <form onSubmit={handleEmailSubmit}>
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
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
