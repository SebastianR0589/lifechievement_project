export interface Reward {
  id: number;
  description: string;
  cost: number;
  gotten: number;
  redeemed: boolean;
  archived: boolean;
  repeatable: boolean;
}