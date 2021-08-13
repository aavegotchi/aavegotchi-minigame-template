import { AavegotchiContractObject } from "types";

export interface AavegotchisOfOwner {
  aavegotchis: Array<AavegotchiContractObject>
}

export const getAllAavegotchisOfOwner = (owner: string) => {
  const query = `
    {
      aavegotchis(first: 500, orderBy: withSetsRarityScore, orderDirection: desc,  where: { owner:"${owner.toLowerCase()}"}) {
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