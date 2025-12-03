import { atom } from "jotai";
import type { User } from "../api/types";

export const authTokenAtom = atom<string | null>(null);

export const currentUserAtom = atom<User | null>(null);

export const isAuthenticatedAtom = atom((get) => {
  return get(authTokenAtom) !== null;
});

export const isLoadingAtom = atom(false);
