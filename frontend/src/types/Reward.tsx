export interface Reward {
  id: number;
  description: string;
  cost: number;
  gotten: number;
  redeemed: boolean;
  state: boolean;
  repeatable: boolean;
}