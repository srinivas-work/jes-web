import { create } from "zustand";
import { MotionValue } from "framer-motion";

type ScrollStore = {
  sectionScrollYProgress: MotionValue<number> | null;
  setSectionScrollYProgress: (val: MotionValue<number>) => void;
};

export const useScrollStore = create<ScrollStore>((set) => ({
  sectionScrollYProgress: null,
  setSectionScrollYProgress: (val) => set({ sectionScrollYProgress: val }),
}));
