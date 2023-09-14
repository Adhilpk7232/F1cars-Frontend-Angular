export interface blockUserRes {
    message: string;
    user: UserModel[];
  }
  
  interface UserModel {
    _id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    city: string;
    isVerified: number;
    otp: number;
    blocked: boolean;
    __v: number;
    state: string;
    wishlist: WishItem[];
  }
  
  interface WishItem {
    _id: string;
    car: string;
  }
  