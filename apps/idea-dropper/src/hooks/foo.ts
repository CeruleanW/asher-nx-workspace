
import { useAllBoxes, useUserByEmail } from '../features/idea-server';
import { useSession } from '../features/auth';
import create from 'zustand';
// import { devtools } from 'zustand/middleware';

/**
 * use user data
 */
export function useUser() {
  const { data: session, status, ...rest} = useSession();
  const userEmail = session?.user?.email;
  // console.log("file: foo.ts:13 ~ useUser ~ userEmail:", userEmail);
  const emailResult = useUserByEmail(userEmail);
  return {...emailResult, sessionStatus: status};
}

/**
 * fetch
 */
export function useMainPageData(enabled = true) {
  const {data: userData, error: userError, sessionStatus} = useUser();
  // console.debug('userData', userData);

  const { data, error:boxesError, ...rest } = useAllBoxes(enabled);
  return { data, boxes: data, user: userData, error: boxesError || userError, ...rest};
}

type ModalState = {
  isDialogOpened: boolean;
  operation: string | null;
  boxID: string | null;
  data: any;
};

type ModalActions = {
  openDialog: () => void;
  closeDialog: () => void;
  setOperation: (payload: string) => void;
  setBoxID: (payload: string) => void;
  setIsOpened: (payload: boolean) => void;
  setData: (payload: any) => void;
}

const DEFAULT_MODAL_STATE: ModalState = {
  isDialogOpened: false,
  operation: null,
  boxID: null,
  data: null,
};

const modalStore = (set) => ({
  ...DEFAULT_MODAL_STATE,
  openDialog: () => set({ isDialogOpened: true }),
  closeDialog: () => set({ isDialogOpened: false }),
  setIsOpened: (payload) => set((state) => ({ isDialogOpened: payload })),
  setOperation: (payload) => set((state) => ({ operation: payload })),
  setBoxID: (payload) => set((state) => ({ boxID: payload })),
  reset: () => set(DEFAULT_MODAL_STATE),
  setData: (payload) => set((state) => ({ data: payload })),
});

export const useModal = create<ModalState & ModalActions>(modalStore);

export const selectSetModalData = (state) => state.setData;
