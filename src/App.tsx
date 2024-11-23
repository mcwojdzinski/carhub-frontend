import axios from "axios";
import "./App.css";
import CarsList from "./components/CarsList/CarsList";
import AddCar from "./components/AddCar/AddCar";
import { useEffect, useState } from "react";
import { Car } from "./interface/Car";

axios.defaults.baseURL = "http://localhost:3000/api/cars";

function App() {
  const [isDark, setIsDark] = useState("dark");
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", isDark ? "dark" : "light");
    }
    fetchCars();
  }, [isDark, cars]);

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
    fetchCars(); // Refresh the list
  };

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-3xl">Cars list:</h1>
      <label className="flex cursor-pointer gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <input
          type="checkbox"
          value="synthwave"
          onClick={() => {
            setIsDark(isDark === "dark" ? "light" : "dark");
          }}
          className="toggle theme-controller"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
      <AddCar addCar={addCar} />
      <CarsList cars={cars} deleteCar={deleteCar} updateCar={updateCar} />
    </div>
  );
}

export default App;
