import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';

import { useSelector } from "react-redux";
import Profile from "./pages/Profile.jsx";
import ForgetPass from "./pages/ForgetPassword.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/Educator/Dashboard.jsx";
import Courses from "./pages/Educator/Courses.jsx";
import CreateCourses from "./pages/Educator/CreateCourses.jsx";
import EditCourse from "./pages/Educator/EditCourse.jsx";
import CreateLecture from "./pages/Educator/createLecture.jsx";

import useCurrentUser from "./customHooks/useCurrentUser.js";
import useCreatorCourses from "./customHooks/useCreatorCourse.js";
import usePublishedCourse from "./customHooks/usePublishedCourse.js";
import AllCourses from "./pages/AllCourses.jsx";
import EditLecture from "./pages/Educator/EditLecture.jsx";
import ViewCourse from "./pages/ViewCourse.jsx";
import ScrollToTop from "./component/ScrollToTop.js";
import ViewLecture from "./pages/ViewLecture.jsx";
import MyEnrolledCourses from "./pages/MyEnrolledCourses.jsx";
import useAllReviews from "./customHooks/useAllReviews.js";
import SearchWithAi from "./pages/SearchWithAi.jsx";

export const serverUrl = "https://skilledge-crx4.onrender.com";

function App() {
    useCurrentUser();      // fetches current user
    useCreatorCourses();   // fetches creator courses
    usePublishedCourse();
    useAllReviews();

    const { userData, loading } = useSelector(state => state.user);

    // Wait until we know if user is logged in
    if (loading) return <div>Loading...</div>;

    return (
        <>
            <ToastContainer />
            <ScrollToTop/>
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/signup' element={
                    loading ? <div>Loading...</div> : (!userData ? <SignUp /> : <Navigate to="/" />)
                } />

                <Route path='/login' element={
                    loading ? <div>Loading...</div> : (!userData ? <Login /> : <Navigate to="/" />)
                } />

                <Route path='/profile' element={
                    loading ? <div>Loading...</div> : (userData ? <Profile /> : <Navigate to="/signup" />)
                } />

                <Route path='/forget' element={
                    loading ? <div>Loading...</div> : (!userData ? <ForgetPass /> : <Navigate to="/profile" />)
                } />

                <Route path='/editprofile' element={
                    loading ? <div>Loading...</div> : (userData ? <EditProfile /> : <Navigate to="/signup" />)
                } />

                <Route path='/Dashboard' element={
                    loading ? <div>Loading...</div> : (userData?.role === "educator" ? <Dashboard /> : <Navigate to="/signup" />)
                } />

                <Route path='/courses' element={
                    loading ? <div>Loading...</div> : (userData?.role === "educator" ? <Courses /> : <Navigate to="/signup" />)
                } />

                <Route path='/createcourse' element={
                    loading ? <div>Loading...</div> : (userData?.role === "educator" ? <CreateCourses /> : <Navigate to="/signup" />)
                } />

                 <Route path='/editcourse/:courseId' element={
                    loading ? <div>Loading...</div> : (userData?.role === "educator" ? <EditCourse /> : <Navigate to="/signup" />)
                } />

                <Route path='/allcourses' element={
                    loading ? <div>Loading...</div> : (userData? <AllCourses /> : <Navigate to="/signup" />)
                    
                } />

                <Route path= "/createlecture/:courseId" element={
                    loading ? <div>Loading...</div> : (userData?.role === "educator" ? <CreateLecture /> : <Navigate to="/signup" />)
                } />

                <Route path= "/editlecture/:courseId/:lectureId" element={
                    loading ? <div>Loading...</div> : (userData?.role === "educator" ? <EditLecture /> : <Navigate to="/signup" />)
                } />

                <Route path= "/viewcourse/:courseId" element={
                    loading ? <div>Loading...</div> : (userData? <ViewCourse /> : <Navigate to="/signup" />)
                } />

                <Route path= "/viewlecture/:courseId" element={
                    loading ? <div>Loading...</div> : (userData? <ViewLecture /> : <Navigate to="/signup" />)
                } />

                <Route path= "/mycourses" element={
                    loading ? <div>Loading...</div> : (userData? <MyEnrolledCourses /> : <Navigate to="/signup" />)
                } />

                <Route path= "/search" element={
                    loading ? <div>Loading...</div> : (userData? <SearchWithAi /> : <Navigate to="/signup" />)
                } />
            </Routes>
             
             
                
           


            
        </>
    );
}

export default App;
