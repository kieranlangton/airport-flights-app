import create from "zustand";

interface SearchTermState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const useSearchTermStore = create<SearchTermState>()((set) => ({
  searchTerm: "",
  setSearchTerm: (searchTerm: string) => set(() => ({ searchTerm })),
}));
