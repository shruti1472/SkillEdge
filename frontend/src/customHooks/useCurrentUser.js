import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
          withCredentials: true
        });
        dispatch(setUserData(res.data));
      } catch (err) {
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);

  return loading;
};

export default useCurrentUser;
