import React, { useEffect } from "react";
import useStore from "../../store";
import { Car } from "../../interface/Car";

const CarsList: React.FC = () => {
  const { cars, fetchCars, deleteCar } = useStore();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <div>
      <h2>Lista Samochodów</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Marka</th>
            <th>Model</th>
            <th>Rok</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car: Car) => (
            <tr key={car._id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>
                <button onClick={() => deleteCar(car._id!)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsList;
