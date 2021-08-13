import { ethers } from 'ethers';
export interface Tuple<T extends unknown, L extends number> extends Array<T> {
  0: T;
  length: L;
}

export interface AavegotchiGameObject extends AavegotchiObject {
  spritesheetKey: string;
  svg: string;
}

export interface AavegotchiObject extends AavegotchiContractObject {
  svg?: string;
}

export interface AavegotchiContractObject {
  // Only in subgraph
  withSetsNumericTraits: Tuple<number, 6>;
  id: string;
  withSetsRarityScore: number;
  owner: {
    id: string;
  };

  // collateral: string;
  name: string;
  // modifiedNumericTraits: number[];
  // numericTraits: number[];
  // owner: string;
  // randomNumber: string;
  status: number;
  // tokenId: ethers.BigNumber;
  // items: ItemsAndBalances[];
  equippedWearables: Tuple<number, 16>;
  // experience: ethers.BigNumber;
  // hauntId: ethers.BigNumber;
  // kinship: ethers.BigNumber;
  // lastInteracted: string;
  // level: ethers.BigNumber;
  // toNextLevel: ethers.BigNumber;
  // stakedAmount: ethers.BigNumber;
  // minimumStake: ethers.BigNumber;
  // usedSkillPoints: ethers.BigNumber;
  // escrow: string;
  // baseRarityScore: ethers.BigNumber;
  // modifiedRarityScore: ethers.BigNumber;
  // locked: boolean;
  // unlockTime: string;
}

export interface ItemsAndBalances {
  itemType: ItemObject;
  itemId: ethers.BigNumber;
  balance: ethers.BigNumber;
}

export interface ItemObject {
  allowedCollaterals: number[];
  canBeTransferred: boolean;
  canPurchaseWithGhst: boolean;
  description?: string;
  category: number;
  experienceBonus: string;
  ghstPrice: ethers.BigNumber;
  kinshipBonus: string;
  maxQuantity: ethers.BigNumberish;
  minLevel: string;
  name: string;
  rarityScoreModifier: string;
  setId: string;
  slotPositions: boolean[];
  svgId: number;
  totalQuantity: number;
  traitModifiers: number[];
}

export interface SubmitScoreReq {
  name: string,
  tokenId: string,
}

export interface HighScore {
  tokenId: string,
  score: number,
  name: string,
}

export interface CustomError extends Error {
  status?: number;
}