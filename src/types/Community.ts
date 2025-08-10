export interface Community {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  approvedByAdmin: boolean;
  isActive: boolean;
}

export interface CommunityState {
  communities: Community[];
  loading: boolean;
  error: string | null;
}

export type CommunityAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "ADD_COMMUNITY"; payload: Community }
  | { type: "UPDATE_COMMUNITY"; payload: Community }
  | { type: "DELETE_COMMUNITY"; payload: string }
  | { type: "SET_COMMUNITIES"; payload: Community[] }
  | { type: "TOGGLE_APPROVAL"; payload: string }
  | { type: "TOGGLE_ACTIVE"; payload: string };
