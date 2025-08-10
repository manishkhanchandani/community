import { Community, CommunityAction } from "../types/Community";
import { v4 as uuidv4 } from "uuid";

// Action creators for dispatching to the reducer
export const createAddCommunityAction = (
  community: Omit<Community, "id" | "createdAt" | "updatedAt">
): CommunityAction => {
  const newCommunity: Community = {
    ...community,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return { type: "ADD_COMMUNITY", payload: newCommunity };
};

export const createUpdateCommunityAction = (
  community: Community
): CommunityAction => {
  const updatedCommunity = {
    ...community,
    updatedAt: new Date(),
  };
  return { type: "UPDATE_COMMUNITY", payload: updatedCommunity };
};

export const createDeleteCommunityAction = (id: string): CommunityAction => {
  return { type: "DELETE_COMMUNITY", payload: id };
};

export const createToggleApprovalAction = (id: string): CommunityAction => {
  return { type: "TOGGLE_APPROVAL", payload: id };
};

export const createToggleActiveAction = (id: string): CommunityAction => {
  return { type: "TOGGLE_ACTIVE", payload: id };
};

export const createSetLoadingAction = (loading: boolean): CommunityAction => {
  return { type: "SET_LOADING", payload: loading };
};

export const createSetErrorAction = (error: string | null): CommunityAction => {
  return { type: "SET_ERROR", payload: error };
};

export const createSetCommunitiesAction = (
  communities: Community[]
): CommunityAction => {
  return { type: "SET_COMMUNITIES", payload: communities };
};
