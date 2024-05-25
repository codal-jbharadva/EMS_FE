import { apiRequest } from "../../utils/ApicallUtil";
import "./index.scss"
import { useState, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
// import './LoginForm.scss';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [keepSignedIn, setKeepSignedIn] = useState<boolean>(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try{
      const response = await apiRequest("user/login","POST",{email, password});
      if(!response.success){
        setIsError(true);
        setErrorMessage(response.data)
      }
      else{
        navigate("/");
      }
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="login-form">
      <div className="login-header">
      <div className={`error-message ${isError ? 'visible' : ''}`}>
          {isError ? errorMessage : ''}
        </div>
        <h2>Log in</h2>
        <p>
          Not a member yet? <a href="/signup">Sign up</a>
        </p>
      </div>
      <form onSubmit={handleLogin}>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="/forgot-password" className="forgot-password">
            Forgot password
          </a>
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="keep-signed-in"
            checked={keepSignedIn}
            onChange={(e) => setKeepSignedIn(e.target.checked)}
          />
          <label htmlFor="keep-signed-in">Keep me signed in</label>
        </div>
        <button type="submit" className="login-button">Log in</button>
      </form>
      <div className="social-login">
        <p>or</p>
        <button type="button" className="social-button facebook">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                <g fill="#3420f2" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><g transform="scale(5.33333,5.33333)"><path d="M29,3c-5.523,0 -10,4.477 -10,10v5h-6v8h6v19h8v-19h7l1,-8h-8v-4c0,-2.209 1.791,-4 4,-4h4v-6.678c-1.909,-0.197 -4.079,-0.326 -6,-0.322z"></path></g></g>
            </svg>
            </div>
            <div> 
                Log in with Facebook
            </div>
            <div></div>
        </button>
        <button type="button" className="social-button google">Log in with Google</button>
        <button type="button" className="social-button apple">Log in with Apple</button>
      </div>
    </div>
  );
};

export default LoginForm;
