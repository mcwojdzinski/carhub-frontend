import { useState } from "react";
import { Car, NewCar } from "../../interface/Car";

interface AddCarProps {
  addCar: (newCar: Car) => Promise<void>;
}

const AddCar = ({ addCar }: AddCarProps) => {
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState<NewCar>({
    brand: "",
    model: "",
    year: 0,
    transmission: "Manualna",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const handleAddCar = async () => {
    if (newCar.brand && newCar.model && newCar.year && newCar.transmission) {
      await addCar(newCar as Car);
      setNewCar({
        brand: "",
        model: "",
        year: 0,
        transmission: "Manualna",
      });
      setShowModal(false);
    } else {
      alert("Proszę wypełnić wszystkie pola!");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-success mt-4"
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Dodaj Nowy Samochód
      </button>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Dodaj Nowy Samochód</h2>
            <div className="mt-4">
              <label className="block mb-2">
                Marka:
                <input
                  name="brand"
                  className="input input-bordered w-full"
                  placeholder="Marka"
                  value={newCar.brand}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block mb-2">
                Model:
                <input
                  name="model"
                  className="input input-bordered w-full"
                  placeholder="Model"
                  value={newCar.model}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block mb-2">
                Rok:
                <input
                  name="year"
                  type="number"
                  min="1900"
                  className="input input-bordered w-full"
                  placeholder="Rok"
                  value={newCar.year}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block mb-2">
                Skrzynia biegów:
                <select
                  name="transmission"
                  className="select select-bordered w-full"
                  value={newCar.transmission}
                  onChange={handleInputChange}
                >
                  <option value="Manualna">Manualna</option>
                  <option value="Automatyczna">Automatyczna</option>
                </select>
              </label>
            </div>
            <div className="modal-action">
              <button onClick={handleAddCar} className="btn btn-primary">
                Dodaj
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
    </>
  );
};

export default AddCar;
