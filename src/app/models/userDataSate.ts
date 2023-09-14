export interface UserDataState{
        blocked: boolean;
        city: string;
        email: string;
        image: string;
        isVerified: number;
        name: string;
        otp: number;
        password: string;
        state: {state:string;
        country: string;
        tax: number;
        __v: number;
        _id: string;}
        wishlist: { car: string; _id: string }[];
      }
      
     