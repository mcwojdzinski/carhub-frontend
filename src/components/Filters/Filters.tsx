import React, { useState } from "react";

interface FiltersProps {
  onFilter: (filters: {
    brand?: string;
    model?: string;
    year?: number;
    transmission?: string;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    year: "",
    transmission: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    const { brand, model, year, transmission } = filters;
    const appliedFilters = {
      brand: brand || undefined,
      model: model || undefined,
      year: year ? Number(year) : undefined,
      transmission: transmission || undefined,
    };
    onFilter(appliedFilters);
  };

  const handleReset = () => {
    setFilters({ brand: "", model: "", year: "", transmission: "" });
    onFilter({});
  };

  return (
    <div className="filters flex flex-col gap-4 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold">Filtry</h3>
      <div className="flex flex-row justify-start gap-4 flex-wrap items-center">
        <input
          name="brand"
          placeholder="Marka"
          value={filters.brand}
          onChange={handleInputChange}
          className="input input-bordered"
        />
        <input
          name="model"
          placeholder="Model"
          value={filters.model}
          onChange={handleInputChange}
          className="input input-bordered"
        />
        <input
          name="year"
          type="number"
          placeholder="Rok"
          value={filters.year}
          onChange={handleInputChange}
          className="input input-bordered"
        />
        <select
          name="transmission"
          value={filters.transmission}
          onChange={handleInputChange}
          className="select select-bordered"
        >
          <option value="">Wybierz skrzynię biegów</option>
          <option value="Manualna">Manualna</option>
          <option value="Automatyczna">Automatyczna</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button onClick={handleFilter} className="btn btn-primary">
          Filtruj
        </button>
        <button onClick={handleReset} className="btn btn-secondary">
          Resetuj
        </button>
      </div>
    </div>
  );
};

export default Filters;
