import AddCompanyModal from "../../Components/Modal/AddCompanyModal";
import SelectedStocksComponent from "../../Components/List/SelectedStockComponent";
import Selected from "../../Data/Selected.json";

const Home = () => {
  return (
    <div className="container">
      <div className="row text-center py-3">
        <h2 className="text-white">Harsh's Portfolio</h2>
      </div>
      <h3 className="row text-white">Company List</h3>

      <div className="row">
        <SelectedStocksComponent selectedStocks={Selected} />
      </div>
      <div className="row my-3">
        <AddCompanyModal />
      </div>
    </div>
  );
};

export default Home;
