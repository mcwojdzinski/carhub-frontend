import { useState } from "react";
import { Car } from "../../interface/Car";
import Modal from "../Modal/Modal";

interface CarsListProps {
  cars: Car[];
  deleteCar: (id: string) => Promise<void>;
  updateCar: (car: Car) => Promise<void>;
}

const CarsList = ({ cars, deleteCar, updateCar }: CarsListProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleDelete = async () => {
    if (selectedCar) {
      await deleteCar(selectedCar._id);
      setShowModal(false);
    }
  };

  const handleEdit = async () => {
    if (selectedCar) {
      await updateCar(selectedCar);
      setShowModal(false);
    }
  };

  return (
    <div>
      <h2>Lista Samochodów</h2>
      <table className="table">
        <thead>
          <tr>
            <th>lp.</th>
            <th>Marka</th>
            <th>Model</th>
            <th>Rok</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car: Car, index: number) => (
            <tr key={car._id}>
              <td>{index + 1}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td className="flex flex-row gap-x-2">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setSelectedCar(car);
                    setEditMode(true);
                    setShowModal(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    setSelectedCar(car);
                    setEditMode(false);
                    setShowModal(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal
          title={editMode ? "Edit Car" : "Confirm Delete"}
          content={
            editMode ? (
              <div>
                <label className="block mb-2">
                  Brand:
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={selectedCar?.brand || ""}
                    onChange={(e) =>
                      setSelectedCar((prev) =>
                        prev ? { ...prev, brand: e.target.value } : null
                      )
                    }
                  />
                </label>
                <label className="block mb-2">
                  Model:
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={selectedCar?.model || ""}
                    onChange={(e) =>
                      setSelectedCar((prev) =>
                        prev ? { ...prev, model: e.target.value } : null
                      )
                    }
                  />
                </label>
                <label className="block mb-2">
                  Year:
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={selectedCar?.year || ""}
                    onChange={(e) =>
                      setSelectedCar((prev) =>
                        prev ? { ...prev, year: e.target.value } : null
                      )
                    }
                  />
                </label>
              </div>
            ) : (
              <p>Are you sure you want to delete {selectedCar?.brand}?</p>
            )
          }
          onClose={() => setShowModal(false)}
          onConfirm={editMode ? handleEdit : handleDelete}
        />
      )}
    </div>
  );
};

export default CarsList;
