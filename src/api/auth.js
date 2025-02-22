// src/api/auth.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
// console.log(BASE_URL);

export const sendOTP = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-otp`, { email });
    return response.data;
  } catch (error) {
    // Return the actual error message from the backend
    if (error.response && error.response.data) {
      return error.response.data; // This will include {success: false, message: "User already registered"}
    }
    // Fallback error message if we can't get the backend message
    return { success: false, message: "Error sending OTP" };  
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: "Server error" };
  }
};

export const signup = async (formData, userType) => {
  try {
    const endpoint = userType === 'mentor' ? '/mentor-signup' : '/signup';
    const response = await axios.post(`${BASE_URL}${endpoint}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error.response?.data || error.message);
    return { success: false, message: "Error during signup" };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: 'POST',
      credentials: 'include', // Important for sending/receiving cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred during login' };
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: 'include'
    });
    localStorage.removeItem('user');
    return await response.json();
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, message: "Server error" };
  }
};

// Mentee login
export const loginMentee = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Login failed' };
  }
};

// Mentor login
export const loginMentor = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/mentor-login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Login failed' };
  }
};
