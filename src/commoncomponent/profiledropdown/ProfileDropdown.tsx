import React, { useState } from 'react';
import "./index.scss";
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/userAuthSlice';
import { CgProfile } from 'react-icons/cg';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-icon" onClick={toggleDropdown}>
        <CgProfile />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="user-info" onClick={() => navigate('/profile')}>
            <p>View Profile</p>
          </div>
          <div className="logout" onClick={handleLogout}>
            Log Out
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
