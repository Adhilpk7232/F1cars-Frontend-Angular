export interface carModel{
    _id:string;
    carName:string;
    description:string;
    image:string;
    price:Number;
    brand:string;
    maileage:Number;
    engine:Number;
    safety:string;
    bodytype:string;
    fuelType:string;
    transmission:string;
    seatCapacity:string;
    role:string;
    lauchedDate:string;
    unList:Boolean;
    colors:[color];
    __v:Number

}
interface color{
    colorName:String;
    color:String;
    colorImage:String;
}