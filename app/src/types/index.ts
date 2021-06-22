import { ethers } from 'ethers';

export interface AavegotchiGameObject extends AavegotchiObject {
  spritesheetKey: string;
}

export interface AavegotchiObject extends AavegotchiContractObject {
  svg: string;
}

export interface AavegotchiContractObject {
  // collateral: string;
  name: string;
  // modifiedNumericTraits: number[];

  // Only in subgraph
  withSetsNumericTraits: [number, number, number, number, number, number];
  id: string;
  // withSetsRarityScore?: ethers.BigNumber;

  // numericTraits: number[];
  // owner: string;
  // randomNumber: string;
  status: number;
  // tokenId: ethers.BigNumber;
  // items: ItemsAndBalances[];
  // equippedWearables: number[];
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

export interface Web3Error {
  status: number,
  error: {
    message: string,
    stack: string,
  }
}
