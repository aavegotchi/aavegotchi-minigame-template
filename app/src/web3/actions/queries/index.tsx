import { AavegotchiContractObject } from "types";

export interface AavegotchisOfOwner {
  aavegotchis: Array<AavegotchiContractObject>
}

export const getAllAavegotchisOfOwner = (owner: string) => {
  const query = `
    {
      aavegotchis(first: 1000, orderBy: withSetsRarityScore, orderDirection: desc,  where: { owner:"${owner.toLowerCase()}", status: 3 }) {
        id
        name
        withSetsNumericTraits
        equippedWearables
        withSetsRarityScore
        owner {
          id
        }
      }
    }
  `
  return query;
}