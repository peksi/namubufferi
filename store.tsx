import { createStore, action, Action } from "easy-peasy";

interface UserModel {
  currentUser: object;
  updateUser: Action<UserModel, string>;
}

interface StoreModel {
  currentUser: UserModel;
}

const currentUser: UserModel = {
  currentUser: {
    UUID: "",
    Balance: 0
  },
  updateUser: action((state, payload) => {
    state.currentUser = payload;
  })
};

const storeModel: StoreModel = {
  currentUser
};

const store = createStore(storeModel);

export default store;
