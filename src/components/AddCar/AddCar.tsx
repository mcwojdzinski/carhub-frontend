import { useState } from "react";

interface AddCarProps {
  addCar: (newCar: {
    brand: string;
    model: string;
    year: number;
  }) => Promise<void>;
}

const AddCar = ({ addCar }: AddCarProps) => {
  const [newCar, setNewCar] = useState({ brand: "", model: "", year: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value, // Convert "year" to a number
    }));
  };

  const handleAddCar = async () => {
    if (newCar.brand && newCar.model && newCar.year) {
      await addCar(newCar); // Call the addCar function passed via props
      setNewCar({ brand: "", model: "", year: 0 }); // Reset form
    } else {
      alert("Proszę wypełnić wszystkie pola!"); // Alert for empty fields
    }
  };

  return (
    <div>
      <h2>Dodaj Nowy Samochód</h2>
      <input
        name="brand"
        placeholder="Marka"
        className="input input-bordered"
        value={newCar.brand}
        onChange={handleInputChange}
      />
      <input
        name="model"
        placeholder="Model"
        className="input input-bordered"
        value={newCar.model}
        onChange={handleInputChange}
      />
      <input
        name="year"
        type="number"
        className="input input-bordered"
        placeholder="Rok"
        value={newCar.year}
        onChange={handleInputChange}
      />
      <button onClick={handleAddCar} className="btn btn-primary">
        Dodaj
      </button>
    </div>
  );
};

export default AddCar;
