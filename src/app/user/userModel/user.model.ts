export interface User {
    _id: string;
    name: string;
    email: string;
    password:string
    image:string
    city:string
    isVerified:Number
    otp:Number
    __v:Number
    blocked:boolean
    state:string
    wishlist: WishlistItem[];
  }
  
  export interface WishlistItem {
    _id: string;
    car: Car;
  }
  
  export interface Car {
    // Define car properties here
    _id:string
    carName:string
    description:string
    image:string
    price:string
    brand:string
    maileage:string
    engine:string
    safety:string
    bodytype:string
    fuelType:string
    transmission:string
    seatCapacity:string
    colors:Colors[]
    role:string
    lauchedDate:string
    unList:boolean
    __v:Number

  }

  export interface Colors{
    colorName:string,
        color:string,
        colorImage:string,
        _id:string,
  }