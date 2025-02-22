import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MentorNavbar from '../../components/common/MentorNavbar';
import defaultAvatar from '../../assets/user.png';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';
import { FaStar, FaCamera } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const MentorProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mentorDetails, setMentorDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    currentPosition: '',
  });

  useEffect(() => {
    if (user?.id) {
      fetchMentorDetails();
    }
  }, [user]);

  const fetchMentorDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/mentor/mentor-details/${user.id}`);
      if (response.data) {
        setMentorDetails(response.data);
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          experience: response.data.experience || '',
          currentPosition: response.data.currentPosition || '',
        });
      }
    } catch (error) {
      console.error('Error fetching mentor details:', error);
      toast.error('Failed to fetch mentor details');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setImageLoading(true);
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.post(`${BASE_URL}/mentor/upload-profile-picture`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setMentorDetails(prev => ({
          ...prev,
          profilePicture: response.data.data.profilePicture
        }));
        toast.success('Profile picture updated successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setImageLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.experience || !formData.currentPosition) {
      toast.error('All fields are required', {
        style: {
          background: '#FF4B4B',
          color: '#fff'
        }
      });
      return;
    }

    try {
      const response = await axios.put(`${BASE_URL}/mentor/update-profile/${user.id}`, {
        name: formData.name,
        experience: formData.experience,
        currentPosition: formData.currentPosition
      });

      if (response.data.message === "Profile updated successfully") {
        toast.success('Profile updated successfully', {
          style: {
            background: '#10B981',
            color: '#fff'
          },
          icon: '👍',
          duration: 3000
        });
        setIsEditing(false);
        await fetchMentorDetails();
      } else {
        toast.error(response.data.message || 'Failed to update profile', {
          style: {
            background: '#FF4B4B',
            color: '#fff'
          }
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile', {
        style: {
          background: '#FF4B4B',
          color: '#fff'
        }
      });
    }
  };

  const handleCancel = () => {
    if (mentorDetails) {
      setFormData({
        name: mentorDetails.name || '',
        email: mentorDetails.email || '',
        experience: mentorDetails.experience || '',
        currentPosition: mentorDetails.currentPosition || '',
      });
    }
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <MentorNavbar />
      <div className="pt-[80px]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-2xl">
            {!isEditing ? (
              <>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative group">
                    <img
                      src={mentorDetails?.profilePicture || defaultAvatar}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-[#4540E1] transition-transform duration-300 group-hover:scale-105 object-cover"
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-[#4540E1] hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                      <FaCamera className="text-current" />
                    </button>
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 relative">
                      Mentor Profile
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#4540E1] rounded-full"></span>
                    </h2>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-3 text-[#4540E1]">Rating Overview</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 transform transition-all duration-300 hover:scale-105">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={index < (mentorDetails?.rating?.average || 0) ? 'text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">
                        ({mentorDetails?.rating?.average || 0} / 5 - {mentorDetails?.rating?.totalReviews || 0} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Name', value: mentorDetails?.name },
                      { label: 'Email', value: mentorDetails?.email },
                      { label: 'Experience', value: `${mentorDetails?.experience} years` },
                      { label: 'Current Position', value: mentorDetails?.currentPosition }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-all duration-300">
                        <label className="text-sm font-medium text-[#4540E1]">{item.label}</label>
                        <p className="mt-1 text-lg font-semibold text-gray-800">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-[#4540E1]">Recent Reviews</h3>
                    <div className="space-y-4">
                      {mentorDetails?.reviews?.map((review) => (
                        <div key={review._id} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-300">
                          <div className="flex text-yellow-400 mb-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, index) => (
                                <FaStar
                                  key={index}
                                  className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-[#4540E1] text-white py-3 px-6 rounded-xl hover:bg-[#3330B0] transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Update Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 relative">
                  Update Profile
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#4540E1] rounded-full"></span>
                </h2>
                
                {[
                  { label: 'Name', name: 'name' },
                  { label: 'Experience (years)', name: 'experience' },
                  { label: 'Current Position', name: 'currentPosition' }
                ].map((field) => (
                  <div key={field.name} className="transform transition-all duration-300 hover:scale-[1.02]">
                    <label className="text-sm font-medium text-[#4540E1]">{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="mt-1 w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4540E1] focus:border-transparent outline-none transition-all duration-300"
                      required
                    />
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl hover:bg-gray-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#4540E1] text-white py-3 px-6 rounded-xl hover:bg-[#3330B0] transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;