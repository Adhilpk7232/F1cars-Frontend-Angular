export interface CarReview {
    _id: string;
    reviewerId: {
      _id: string;
      name: string;
      email: string;
      password: string;
      image: string | null;
      city: string;
      isVerified: number;
      __v: number;
    };
    carId: string;
    heading: string;
    content: string;
    shortestDescription: string;
    image: string;
    overAllScore: number;
    unlist: boolean;
    date: Date;
    __v: number;
  }
  