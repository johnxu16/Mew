import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import createSelectors from './libs/selector'
import { StorageSceneKey, zustandStorage } from './libs/storage'

interface State {
  token: string
  user: {
    userName: string
    avatar: string
    role: string
  }
}
interface Action {
  setUser: (user: State['user']) => void
  removeUser: () => void
  setToken: (token: string) => void
  removeToken: () => void
}

const initialState: State = {
  token: '',
  user: {
    userName: '',
    avatar: '',
    role: '',
  },
}

const store = create<State & Action>()(
  immer(
    persist(
      (set, _get) => ({
        token: initialState.token,
        user: initialState.user,
        setUser: user => set({ user }),
        removeUser: () => set({ user: initialState.user }),
        setToken: token => set({ token }),
        removeToken: () => set({ token: initialState.token }),
      }),
      {
        name: StorageSceneKey.USER,
        storage: createJSONStorage(() => zustandStorage),
      },
    ),
  ),
)

export const useUserStore = createSelectors(store)
export function userReset() {
  store.setState(initialState)
}
