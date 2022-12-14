import { atom } from 'recoil';

import { VCListType } from '@/lib/types/mockApp/Form';
import persistAtom from '../persistAtom';

export const VCListState = atom<VCListType>({
    key: 'VCListState',
    default: {},
    effects_UNSTABLE: [persistAtom],
});
