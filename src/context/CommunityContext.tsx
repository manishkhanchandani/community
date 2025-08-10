import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import { CommunityState, CommunityAction } from "../types/Community";
import { communityReducer, initialState } from "../reducers/communityReducer";

interface CommunityContextType {
  state: CommunityState;
  dispatch: React.Dispatch<CommunityAction>;
}

const CommunityContext = createContext<CommunityContextType | undefined>(
  undefined
);

export function CommunityProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [state, dispatch] = useReducer(communityReducer, initialState);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <CommunityContext.Provider value={contextValue}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error("useCommunity must be used within a CommunityProvider");
  }
  return context;
}

// Empty export to ensure this is treated as a module
export {};
