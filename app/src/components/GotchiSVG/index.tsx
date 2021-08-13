import { useWeb3 } from "web3/context";
import { useEffect, useState } from "react";
import { useDiamondCall } from "web3/actions";
import gotchiLoading from 'assets/gifs/loading.gif';
import { Web3Provider } from "@ethersproject/providers";
import { convertInlineSVGToBlobURL, customiseSvg, CustomiseOptions} from 'helpers/aavegotchi';

interface Props {
  tokenId: string;
  options?: CustomiseOptions;
  lazyloadIn?: boolean;
}

export const GotchiSVG = ({ tokenId, options, lazyloadIn }: Props) => {
  const { state: { usersAavegotchis, provider }, dispatch} = useWeb3();
  const [ svg, setSvg ] = useState<string>();

  const fetchGotchiSvg = async (id: string, isOwner: boolean, provider: Web3Provider) => {
    try {
      const res = await useDiamondCall<string>(provider, { name: "getAavegotchiSvg", parameters: [id]});
      if (isOwner) {
        dispatch({
          type: "UPDATE_AAVEGOTCHI_SVG",
          tokenId: id,
          svg: res
        })
      } else {
        setSvg(options ? customiseSvg(res, options) : res)
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: "SET_ERROR",
        error
      })
    }
  }

  useEffect(() => {
    if (usersAavegotchis && (lazyloadIn === undefined || lazyloadIn)) {
      const gotchis = [...usersAavegotchis]
      const selectedGotchi = gotchis.find(gotchi => gotchi.id === tokenId);
      if (selectedGotchi?.svg) {
        setSvg(options ? customiseSvg(selectedGotchi.svg, options, selectedGotchi.equippedWearables) : selectedGotchi.svg);
      } else if (provider) {
        fetchGotchiSvg(tokenId, !!selectedGotchi, provider);
      }
    }
  }, [usersAavegotchis, tokenId, lazyloadIn])

  return (
    <img src={svg ? convertInlineSVGToBlobURL(svg) : gotchiLoading} height="100%" width="100%" />
  )
}