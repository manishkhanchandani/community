import { produce } from "immer";
import { CommunityState, CommunityAction } from "../types/Community";
import { sampleCommunities } from "../data/sampleData";

export const initialState: CommunityState = {
  communities: sampleCommunities,
  loading: false,
  error: null,
};

export function communityReducer(
  state: CommunityState,
  action: CommunityAction
): CommunityState {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SET_LOADING":
        draft.loading = action.payload;
        break;
      case "SET_ERROR":
        draft.error = action.payload;
        draft.loading = false;
        break;
      case "SET_COMMUNITIES":
        draft.communities = action.payload;
        draft.loading = false;
        draft.error = null;
        break;
      case "ADD_COMMUNITY":
        draft.communities.push(action.payload);
        draft.loading = false;
        draft.error = null;
        break;
      case "UPDATE_COMMUNITY": {
        const updateIndex = draft.communities.findIndex(
          (community) => community.id === action.payload.id
        );
        if (updateIndex !== -1) {
          draft.communities[updateIndex] = action.payload;
        }
        draft.loading = false;
        draft.error = null;
        break;
      }
      case "DELETE_COMMUNITY": {
        const deleteIndex = draft.communities.findIndex(
          (community) => community.id === action.payload
        );
        if (deleteIndex !== -1) {
          draft.communities.splice(deleteIndex, 1);
        }
        draft.loading = false;
        draft.error = null;
        break;
      }
      case "TOGGLE_APPROVAL": {
        const approvalIndex = draft.communities.findIndex(
          (community) => community.id === action.payload
        );
        if (approvalIndex !== -1) {
          draft.communities[approvalIndex].approvedByAdmin =
            !draft.communities[approvalIndex].approvedByAdmin;
          draft.communities[approvalIndex].updatedAt = new Date();
        }
        break;
      }
      case "TOGGLE_ACTIVE": {
        const activeIndex = draft.communities.findIndex(
          (community) => community.id === action.payload
        );
        if (activeIndex !== -1) {
          draft.communities[activeIndex].isActive =
            !draft.communities[activeIndex].isActive;
          draft.communities[activeIndex].updatedAt = new Date();
        }
        break;
      }
    }
  });
}
