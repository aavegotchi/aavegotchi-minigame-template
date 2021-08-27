export const addresses = {
  diamond: "0x86935F11C86623deC8a25696E1C19a8659CbF95d"
}

type IdToName = {
  [key: number]: string;
}

export const networkIdToName: IdToName = {
  1: "Ethereum",
  137: "Polygon"
}

export type Collaterals = "maAave" | "maWETH" | "maLINK";
type CollateralToAddress = {
  [key in Collaterals]: string;
}
export const collateralToAddress: CollateralToAddress = {
  maAave: "0x823cd4264c1b951c9209ad0deaea9988fe8429bf",
  maWETH: "0x20d3922b4a1a8560e1ac99fba4fade0c849e2142",
  maLINK: "0x98ea609569bd25119707451ef982b90e3eb719cd"
}