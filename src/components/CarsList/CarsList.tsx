import { useEffect, useState } from "react";
import { Car } from "../../interface/Car";
import Filters from "../Filters/Filters";
import axios from "axios";

interface CarsListProps {
  cars: Car[];
  deleteCar: (id: string) => Promise<void>;
  updateCar: (car: Car) => Promise<void>;
}

const CarsList = ({ cars, deleteCar, updateCar }: CarsListProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);

  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

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

  const handleFilter = async (filters: {
    brand?: string;
    model?: string;
    year?: number;
    transmission?: string;
  }) => {
    try {
      const query = Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== "")
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {} as Record<string, string | number>);

      const response = await axios.get("/filter", {
        params: query,
      });

      if (response.status === 200) {
        setFilteredCars(response.data);
      } else {
        console.error("Nie udało się pobrać danych. Kod:", response.status);
      }
    } catch (error) {
      console.error("Błąd podczas filtrowania:", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Filters onFilter={handleFilter} />
      {filteredCars.length == 0 ? (
        <div role="alert" className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Nie udało się znaleźć auta o podanych filtrach</span>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>lp.</th>
              <th>Marka</th>
              <th>Model</th>
              <th>Rok</th>
              <th>Rodzaj skrzyni biegów</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car: Car, index: number) => (
              <tr key={car._id}>
                <td>{index + 1}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.transmission}</td>
                <td className="flex flex-row gap-x-2">
                  <button
                    className="btn btn-sm btn-warning"
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
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edytuj
                  </button>
                  <button
                    className="btn btn-sm btn-error"
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
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {editMode ? "Edytuj Samochód" : "Potwierdź Usunięcie"}
            </h3>
            <div className="py-4">
              {editMode ? (
                <>
                  <label className="block mb-2">
                    Marka:
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
                    Rok:
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={selectedCar?.year || ""}
                      onChange={(e) =>
                        setSelectedCar((prev) =>
                          prev
                            ? { ...prev, year: Number(e.target.value) }
                            : null
                        )
                      }
                    />
                  </label>
                  <label className="block mb-2">
                    Skrzynia biegów:
                    <select
                      className="select select-bordered w-full"
                      value={selectedCar?.transmission || ""}
                      onChange={(e) =>
                        setSelectedCar((prev) =>
                          prev
                            ? {
                                ...prev,
                                transmission: e.target.value as
                                  | "Manualna"
                                  | "Automatyczna",
                              }
                            : null
                        )
                      }
                    >
                      <option value="manualna">Manualna</option>
                      <option value="automatyczna">Automatyczna</option>
                    </select>
                  </label>
                </>
              ) : (
                <p>Czy na pewno chcesz usunąć {selectedCar?.brand}?</p>
              )}
            </div>
            <div className="modal-action">
              <button
                onClick={editMode ? handleEdit : handleDelete}
                className="btn btn-primary"
              >
                {editMode ? "Zapisz" : "Usuń"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsList;
