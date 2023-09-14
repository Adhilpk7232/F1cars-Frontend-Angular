export interface CarBrand {
    _id: string;
    carName: string;
    description: string;
    image: string;
    price: number;
    brand: {
      _id: string;
      brand: string;
      image: string;
      unList: boolean;
      __v: number;
    };
    maileage: number;
    engine: number;
    safety: string;
    bodytype: string;
    fuelType: string;
    transmission: string;
    seatCapacity: string;
    colors: {
      colorName: string;
      color: string;
      colorImage: string;
      _id: string;
    }[];
    role: string;
    lauchedDate: Date; // Converted from MongoDB Date to TypeScript Date
    unList: boolean;
    __v: number;
  }