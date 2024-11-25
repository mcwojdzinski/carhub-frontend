export interface Car {
    _id: string;
    brand: string;
    model: string;
    year: number;
    transmission: "Manualna" | "Automatyczna";
  }
  
  export interface NewCar {
    brand: string;
    model: string;
    year: number;
    transmission: "Manualna" | "Automatyczna";
  }
  