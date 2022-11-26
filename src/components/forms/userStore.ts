import create from "zustand";

interface UserState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean | undefined) => void;
}

const useUserStore = create<UserState>((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) =>
    set(() => ({
      isLogin: isLogin,
    })),
}));

export default useUserStore;
