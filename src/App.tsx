import axios from "axios";
import "./App.css";
import CarsList from "./components/CarsList/CarsList";
import AddCar from "./components/AddCar/AddCar";
import { useEffect, useState } from "react";
import { Car } from "./interface/Car";

axios.defaults.baseURL = "https://carhub-backend-84pr.onrender.com/api/cars";

function App() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const response = await axios.get("/");
    setCars(response.data);
  };

  const addCar = async (newCar: {
    brand: string;
    model: string;
    year: number;
  }) => {
    await axios.post("/", newCar);
    fetchCars();
  };

  const deleteCar = async (id: string) => {
    await axios.delete(`/${id}`);
    fetchCars();
  };

  const updateCar = async (car: Car) => {
    await axios.put(`/${car._id}`, car);
    fetchCars();
  };

  return (
    <div className="container mx-auto flex flex-col gap-y-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl">Lista samochodów:</h1>
        <AddCar addCar={addCar} />
      </div>
      <CarsList cars={cars} deleteCar={deleteCar} updateCar={updateCar} />
    </div>
  );
}

export default App;
