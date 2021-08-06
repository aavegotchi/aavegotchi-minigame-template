import { State } from "./initialState";

export type Action =
  | {
      type: "SET_USERS_AAVEGOTCHIS";
      usersAavegotchis: State["usersAavegotchis"];
    }
  | {
      type: "SET_SELECTED_AAVEGOTCHI";
      selectedAavegotchiIndex: State["selectedAavegotchiIndex"];
    }
  | {
      type: "START_ASYNC";
    }
  | {
      type: "SET_ERROR";
      error: State["error"];
    }
  | {
      type: "SET_NETWORK_ID";
      networkId: State["networkId"];
    }
  | {
      type: "END_ASYNC";
    }
  | {
      type: "UPDATE_AAVEGOTCHI_SVG";
      tokenId: string;
      svg: string;
    }
  | {
      type: "SET_PROVIDER";
      provider: State["provider"];
    }
  | {
      type: "SET_ADDRESS";
      address: State["address"];
    }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USERS_AAVEGOTCHIS": {
      return {
        ...state,
        usersAavegotchis: action.usersAavegotchis,
      };
    }
    case "SET_SELECTED_AAVEGOTCHI": {
      return {
        ...state,
        selectedAavegotchiIndex: action.selectedAavegotchiIndex,
      };
    }
    case "START_ASYNC": {
      return {
        ...state,
        loading: true,
      };
    }
    case "END_ASYNC": {
      return {
        ...state,
        loading: false,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case "SET_NETWORK_ID": {
      return {
        ...state,
        networkId: action.networkId,
      };
    }
    case "UPDATE_AAVEGOTCHI_SVG": {
      if (!state.usersAavegotchis) throw "No Aavegotchis to update."
      const copyGotchiState = [...state.usersAavegotchis];
      const updatedGotchi = copyGotchiState.find(gotchi => gotchi.id === action.tokenId);

      if (updatedGotchi) {
        updatedGotchi.svg = action.svg;
        return {
          ...state,
          usersAavegotchis: copyGotchiState
        }
      } else {
        throw "Selected gotchi doesn't exist in state."
      }
    }
    case "SET_PROVIDER": {
      return {
        ...state,
        provider: action.provider
      }
    }
    case "SET_ADDRESS": {
      return {
        ...state,
        address: action.address
      }
    }
    default:
      throw "Bad action type";
  }
};
