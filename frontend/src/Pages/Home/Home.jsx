import AddCompanyModal from "../../Components/Modal/AddCompanyModal";
import SelectedStocksComponent from "../../Components/List/SelectedStockComponent";
import Notifications from "../../Components/Notifications/Notifications";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    companies: [],
    notifications: [
      // {
      //   name: "Amazon",
      //   priorityLevel: 5,
      //   url: "https://www.cnbc.com/2024/04/18/google-terminates-28-employees-after-series-of-protests-read-the-memo.html?&qsearchterm=google",
      // },
    ],
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("/api/user");
        // console.log(res.data.data);
        setUserInfo(res.data.data);
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="container ">
      <div className="row text-center py-3">
        <h2 className="text-white">{userInfo.name} Portfolio</h2>
      </div>
      <h3 className="row text-white mx-3">Recent Notification</h3>
      <div className="row mx-2">
        {userInfo?.notifications?.length === 0 ? (
          <h4 className="text-info text-center fs-4">No Notification as of Now</h4>
        ) : (
          <Notifications setUserInfo={setUserInfo} userInfo={userInfo} />
        )}
      </div>
      <h3 className="row text-white mx-3">Company List</h3>
      <div className="row mx-2">
        {userInfo?.companies?.length === 0 ? (
          <h4 className="text-info text-center fs-4">Add Some Companies Stock to view</h4>
        ) : (
          <SelectedStocksComponent setUserInfo={setUserInfo} userInfo={userInfo} />
        )}
      </div>
      <div className="row my-3 mx-3">
        <AddCompanyModal setUserInfo={setUserInfo} />
      </div>
    </div>
  );
};

export default Home;
