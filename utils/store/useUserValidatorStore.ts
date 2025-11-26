import { create } from "zustand";

interface UserValidatorState {
  isOpen: boolean;
  isValidated: boolean; // NEW
  openValidator: () => void;
  closeValidator: () => void;
  setValidated: (value: boolean) => void;
}

export const useUserValidatorStore = create<UserValidatorState>((set) => {
  // Load initial validation state from localStorage (only in browser)
  const storedValidated =
    typeof window !== "undefined"
      ? localStorage.getItem("user_validated") === "true"
      : false;

  return {
    isOpen: false,
    isValidated: storedValidated,

    openValidator: () =>
      set((state) => {
        // If already validated, skip opening the form
        if (state.isValidated) return state;
        return { isOpen: true };
      }),

    closeValidator: () => set({ isOpen: false }),

    setValidated: (value) =>
      set(() => {
        // Persist to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user_validated", value ? "true" : "false");
        }
        return { isValidated: value };
      }),
  };
});
