import { useState } from "react"
import { useRouter } from "next/router";
import { useSetRecoilState } from 'recoil';
import { VCListState } from '@/lib/states/mockApp';

const useVCAcceptMain = () => {
    const router = useRouter();
    const [isEnabled, setIsEnabled] = useState(true);
    const setVCList = useSetRecoilState(VCListState);

    const accept = async () => {
        setIsEnabled(!isEnabled);
        setVCList((items) => (items.tax ? { ...items, tax: { ...items.tax, acceptStatus: true } } : items));
    }

    const onSubmit = () => {
        router.push("/61_VCList")
    }

    return { isEnabled, accept, onSubmit };
};

export default useVCAcceptMain;