import AddCompanyModal from "../../Components/Modal/AddCompanyModal";
import SelectedStocksComponent from "../../Components/List/SelectedStockComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    companies: [],
  });

  const updateUser = (newUser) => {
    setUserInfo(newUser);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("/api/user");
        console.log(res.data.data);
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
        <h2 className="text-white">{userInfo.name}</h2>
      </div>
      <h3 className="row text-white mx-2">Company List</h3>

      <div className="row mx-2">
        {userInfo?.companies?.length === 0 ? (
          <h4 className="text-info text-center fs-4">Add Some Companies Stock to view</h4>
        ) : (
          <SelectedStocksComponent selectedStocks={userInfo.companies} updateUser={updateUser} user={userInfo} />
        )}
      </div>
      <div className="row my-3 mx-2">
        <AddCompanyModal />
      </div>
    </div>
  );
};

export default Home;
