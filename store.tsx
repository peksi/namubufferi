import { createStore, action, Action, createTypedHooks } from "easy-peasy";

interface UserModel {
  currentUser: {
    uuid: string;
    balance: number;
  };
  updateUser: Action<UserModel, { uuid: string; balance: number }>;
}

interface StoreModel {
  currentUser: UserModel;
}

const currentUser: UserModel = {
  currentUser: {
    uuid: "",
    balance: 0
  },
  updateUser: action((state, payload) => {
    state.currentUser = payload;
  })
};

const storeModel: StoreModel = {
  currentUser
};

const store = createStore(storeModel);

const typedHooks = createTypedHooks<StoreModel>();

// 👇 export the typed hooks
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
