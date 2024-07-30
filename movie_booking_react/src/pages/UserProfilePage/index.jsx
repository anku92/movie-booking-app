import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import './UserProfilePage.css';
import Endpoints from '../../api/Endpoints';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    date_of_birth: '',
    username: '',
    password: '',
    email: '',
    mobile: '',
    address: '',
  });

  const fetchUserProfile = useCallback(async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      const access_token = localStorage.getItem('access_token');

      // Check if token is available
      if (!access_token) {
        throw new Error('No access token found');
      }

      const response = await axios.get(`${Endpoints.USERS}${user_id}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status === 200) {
        setProfile(response.data);
        setEditedProfile(response.data);
      } else {
        console.error('Error fetching user profile:', response.status);
        if (response.status === 401) {
          // Handle token expiration
          localStorage.removeItem('user_id');
          localStorage.removeItem('access_token');
          alert('Session expired. Please log in again.');
          navigate('/login') // Redirect to login page
        } else {
          alert('Error loading profile. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
      alert('An error occurred while fetching the profile.');
    } finally {
      setLoading(false);
    }
  }, [navigate]); // Add `navigate` as a dependency

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);


  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedProfile(profile);
  };

  const handleSaveEdit = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      const access_token = localStorage.getItem('access_token');
      await axios.put(`${Endpoints.USERS}${user_id}/`, editedProfile, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setProfile(editedProfile);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "_";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row mt-4 py-3">
          {loading ? (
            <div className="d-flex justify-content-center w-100">
              <div style={{ position: 'fixed', top: '50%' }} className="spinner-border text-primary"></div>
            </div>
          ) : profile ? (
            <>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body bg-primary text-center">
                    <FaUser className="img-fluid" color="white" size="120px" />
                    <h5 className="my-3 text-white">{profile.username}</h5>
                    <p className="mb-0">Admin Access: {profile.is_staff && profile.is_superuser ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
              {!isEditMode ? (
                <div className='col-md-8'>
                  <div className="card mb-4">
                    <div className="card-body bg-light">
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Full Name</strong>
                        </div>
                        <div className="col-md-7">
                          <p className="text-muted mb-0">{profile.name}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong className="mb-0">DOB</strong>
                        </div>
                        <div className="col-md-7">
                          <p className="text-muted mb-0">{formatDate(profile.date_of_birth)}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Username</strong>
                        </div>
                        <div className="col-md-7">
                          <p className="text-muted mb-0">{profile.username}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Password</strong>
                        </div>
                        <div className="col-md-7">
                          <p className="text-muted mb-0">************</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Email</strong>
                        </div>
                        <div className="col-md-7">
                          <p className="text-muted mb-0">{profile.email}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Mobile</strong>
                        </div>
                        <div className="col-md-7">
                          <p className="text-muted mb-0">
                            {profile.mobile.length === 0 ? "_" : profile.mobile}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Address</strong>
                        </div>
                        <div className="col-md-7">
                          <p className="text-muted mb-0">
                            {profile.address.length === 0 ? "_" : profile.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={handleEdit}>
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className='col-md-8'>
                  <div className="card mb-4">
                    <div className="card-body bg-light">
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Full Name</strong>
                        </div>
                        <div className="col-md-7">
                          <input
                            type="text"
                            className="form-control form-control-sm mb-0"
                            name="name"
                            value={editedProfile.name || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>DOB</strong>
                        </div>
                        <div className="col-md-7">
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            name="date_of_birth"
                            value={editedProfile.date_of_birth || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Username</strong>
                        </div>
                        <div className="col-md-7">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="username"
                            value={editedProfile.username || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Password</strong>
                        </div>
                        <div className="col-md-7">
                          <input
                            type="password"
                            className="form-control form-control-sm"
                            name="password"
                            value={editedProfile.password || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Email</strong>
                        </div>
                        <div className="col-md-7">
                          <input
                            type="email"
                            className="form-control form-control-sm"
                            name="email"
                            value={editedProfile.email || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Mobile</strong>
                        </div>
                        <div className="col-md-7">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="mobile"
                            value={editedProfile.mobile || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-5">
                          <strong>Address</strong>
                        </div>
                        <div className="col-md-7">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="address"
                            value={editedProfile.address || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='text-right'>
                    <button className="btn btn-primary mr-2" onClick={handleSaveEdit}>
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="col text-danger text-center">
              <p className="blockquote">Error loading profile...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;