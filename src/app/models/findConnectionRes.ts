interface Reviewer {
    _id: string;
    name: string;
    email: string;
    password: string;
    image: string | null;
    city: string;
    isVerified: number;
    __v: number;
  }
  
  interface ConnectionData {
    _id: string;
    user: string;
    reviewer: Reviewer;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  
  export interface findConnectionData {
    connectionData: ConnectionData[];
    userId: string;
  }
  
  