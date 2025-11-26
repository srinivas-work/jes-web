import { create } from "zustand";

interface UserValidatorState {
  isOpen: boolean;
  openValidator: () => void;
  closeValidator: () => void;
}

export const useUserValidatorStore = create<UserValidatorState>((set) => ({
  isOpen: false,

  openValidator: () =>
    set({
      isOpen: true,
    }),

  closeValidator: () =>
    set({
      isOpen: false,
    }),
}));
