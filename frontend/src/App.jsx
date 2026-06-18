import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';

import { useSelector } from "react-redux";
import Profile from "./pages/Profile.jsx";
import ForgetPass from "./pages/ForgetPassword.jsx";
import EditProfile from "./pages/EditProfile.jsx";
const Dashboard = lazy(() => import("./pages/Educator/Dashboard.jsx"));
const Courses = lazy(() => import("./pages/Educator/Courses.jsx"));
const CreateCourses = lazy(() => import("./pages/Educator/CreateCourses.jsx"));
const EditCourse = lazy(() => import("./pages/Educator/EditCourse.jsx"));
const CreateLecture = lazy(() => import("./pages/Educator/createLecture.jsx"));
const EditLecture = lazy(() => import("./pages/Educator/EditLecture.jsx"));

import useCurrentUser from "./customHooks/useCurrentUser.js";
import useCreatorCourses from "./customHooks/useCreatorCourse.js";
// import usePublishedCourse from "./customHooks/usePublishedCourse.js";
import AllCourses from "./pages/AllCourses.jsx";
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
    // usePublishedCourse();
    // useAllReviews();

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

               <Route
    path='/Dashboard'
    element={
        loading ? (
            <div>Loading...</div>
        ) : (
            userData?.role === "educator" ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard />
                </Suspense>
            ) : (
                <Navigate to="/signup" />
            )
        )
    }
/>

               <Route path='/courses' element={
    loading ? <div>Loading...</div> : (
        userData?.role === "educator" ? (
            <Suspense fallback={<div>Loading...</div>}>
                <Courses />
            </Suspense>
        ) : (
            <Navigate to="/signup" />
        )
    )
} />

               <Route path='/createcourse' element={
    loading ? <div>Loading...</div> : (
        userData?.role === "educator" ? (
            <Suspense fallback={<div>Loading...</div>}>
                <CreateCourses />
            </Suspense>
        ) : (
            <Navigate to="/signup" />
        )
    )
} />

                 <Route path='/editcourse/:courseId' element={
    loading ? <div>Loading...</div> : (
        userData?.role === "educator" ? (
            <Suspense fallback={<div>Loading...</div>}>
                <EditCourse />
            </Suspense>
        ) : (
            <Navigate to="/signup" />
        )
    )
} />

                <Route path='/allcourses' element={
                    loading ? <div>Loading...</div> : (userData? <AllCourses /> : <Navigate to="/signup" />)
                    
                } />

               <Route path='/createlecture/:courseId' element={
    loading ? <div>Loading...</div> : (
        userData?.role === "educator" ? (
            <Suspense fallback={<div>Loading...</div>}>
                <CreateLecture />
            </Suspense>
        ) : (
            <Navigate to="/signup" />
        )
    )
} />

                <Route path='/editlecture/:courseId/:lectureId' element={
    loading ? <div>Loading...</div> : (
        userData?.role === "educator" ? (
            <Suspense fallback={<div>Loading...</div>}>
                <EditLecture />
            </Suspense>
        ) : (
            <Navigate to="/signup" />
        )
    )
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
