import create from "zustand";

interface SearchTerState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const useSearchTermStore = create<SearchTerState>((set) => ({
  searchTerm: "",
  setSearchTerm: (searchTerm: string) => set(() => ({ searchTerm })),
}));
