export type Address = `0x${string}`;

export type UserProfile = {
  address: Address;
  ethosScore: number;
  benefitTier: number;
  penaltyLevel: number;
  recoveryStage: number;
  lastUpdate: string;
};

