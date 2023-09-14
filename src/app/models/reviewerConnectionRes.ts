
// export interface ReviewerConnectionRes{
//     reviewerConnectionData:[ReviewerConnection]
//     viewerId:string
// }

export interface ReviewerConnectionRes {
    createdAt: string;
    reviewer: string;
    updatedAt: string;
    user: User;
    __v: number;
    _id: string;
  }
interface User {
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