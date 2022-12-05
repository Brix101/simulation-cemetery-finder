import { User } from "@prisma/client";
import create from "zustand";

interface UserState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean | undefined) => void;
  isAdding: boolean;
  setIsAdding: (isAdding: boolean | undefined) => void;
  users: User[];
  setUsers: (users: User[] | undefined) => void;
  isUserUpdate: User | undefined;
  setIsUserUpdate: (user: User | undefined) => void;
}

const useUserStore = create<UserState>((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) =>
    set(() => ({
      isLogin: isLogin,
    })),
  isAdding: false,
  setIsAdding: (isAdding) =>
    set(() => ({
      isAdding: isAdding,
    })),
  users: [],
  setUsers: (users) =>
    set(() => ({
      users: users,
    })),
  isUserUpdate: undefined,
  setIsUserUpdate: (user) => set(() => ({ isUserUpdate: user })),
}));

export default useUserStore;
