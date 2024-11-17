import useStore from "../../store";
import { useState } from "react";

const AddCar: React.FC = () => {
  const { addCar } = useStore();
  const [newCar, setNewCar] = useState({ brand: "", model: "", year: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({
      ...prev,
      [name]: name === "rok" ? Number(value) : value,
    }));
  };

  const handleAddCar = async () => {
    if (newCar.brand && newCar.model && newCar.year) {
      await addCar(newCar); // Wywołujemy funkcję dodawania z store
      setNewCar({ brand: "", model: "", year: "" }); // Resetujemy formularz
    } else {
      alert("Proszę wypełnić wszystkie pola!");
    }
  };

  return (
    <div>
      <h2>Dodaj Nowy Samochód</h2>
      <input
        name="marka"
        placeholder="Marka"
        value={newCar.brand}
        onChange={handleInputChange}
      />
      <input
        name="model"
        placeholder="Model"
        value={newCar.model}
        onChange={handleInputChange}
      />
      <input
        name="rok"
        type="number"
        placeholder="Rok"
        value={newCar.year}
        onChange={handleInputChange}
      />
      <button onClick={handleAddCar}>Dodaj</button>
    </div>
  );
};

export default AddCar;
