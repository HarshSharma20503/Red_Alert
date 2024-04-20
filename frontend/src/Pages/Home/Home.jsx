import AddCompanyModal from "../../Components/Modal/AddCompanyModal";
import SelectedStocksComponent from "../../Components/List/SelectedStockComponent";
import Selected from "../../Data/Selected.json"

const Home = () => {
  return (
    <div className="container">
      <div className="row text-center py-3">
        <h3 style={{ color: "white" }}>Red Alert</h3>
      </div>
      <div className="row my-3">
        <AddCompanyModal />
      </div>
      <div className="row">
        <SelectedStocksComponent selectedStocks={Selected} />
      </div>
    </div>
  );
};

export default Home;
