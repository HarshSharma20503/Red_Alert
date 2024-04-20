import AddCompanyModal from "../../Components/Modal/AddCompanyModal";

const Home = () => {
  return (
    <div className="container">
      <div className="row text-center py-3"> 
        <h3 style={{color : "white"}}>Red Alert</h3>
      </div>
      <div className="row my-3">
        <AddCompanyModal />
      </div>
    </div>
  );
};

export default Home;
