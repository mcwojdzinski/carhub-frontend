import axios from "axios";
import "./App.css";
import CarsList from "./components/CarsList/CarsList";
import AddCar from "./components/AddCar/AddCar";

axios.defaults.baseURL = "http://localhost:3000/api/cars";

function App() {
  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-3xl">Cars list: </h1>
      <AddCar />
      <CarsList />
    </div>
  );
}

export default App;
