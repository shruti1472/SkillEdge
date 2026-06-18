import { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from '../redux/courseSlice';
import { serverUrl } from "../App";

const useCreatorCourses = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        const fetchCourses = async () => {

            if (!userData) return;

            // Only educators should fetch creator courses
            if (userData.role !== "educator") return;

            try {
                const result = await axios.get(
                    serverUrl + "/api/course/getcreator",
                    { withCredentials: true }
                );

                console.log("Fetched courses:", result.data);
                dispatch(setCreatorCourseData(result.data));

            } catch (error) {
                console.error("Error fetching creator courses:", error);
            }
        };

        fetchCourses();

    }, [userData, dispatch]);
};

export default useCreatorCourses;