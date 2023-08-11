// car.model.ts

export interface Car {
    _id?: string;
    carName: string;
    description: string;
    image: string;
    price: string;
    brand: string; // You can use a string here as we only need the brand's ObjectId from MongoDB
    maileage: string;
    engine: string;
    safety: string;
    bodytype: string;
    fuelType: string;
    transmission: string;
    seatCapacity: string;
    role: string;
    lauchedDate?: Date;
    unList: boolean;
  }
  