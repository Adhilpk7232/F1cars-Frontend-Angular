export interface SubscriptionPlan {
    _id: { $oid: string };
    name: string;
    description: string;
    validityMonth: number;
    price: number;
    date: { $date: string };
    unList: boolean;
    createdAt: { $date: string };
    updatedAt: { $date: string };
    __v: number;
  }