import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { VCListState } from '@/lib/states/mockApp';

import Header from '@/components/Header';

const VCAcceptMain = () => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [VCList, setVCList] = useRecoilState(VCListState);

  useEffect(() => {
    if (VCList.resident && VCList.resident.acceptStatus) {
      setDisabled(true);
    }
  }, [disabled, VCList])

  const acceptHandler = () => {
    setDisabled(!disabled);
    setVCList((items) => (items.resident ? { ...items, resident: { ...items.resident, acceptStatus: true } } : items));
  };

  const buttonClickHandler = async () => {
    router.push("/61_VCList")
  };

  return (
    <>
      <Header menuType={1} menuTitle={'住民票の受入'} />
      <main className="bg-color-background">
        <div className="py-0 px-[53px]">
          <p className="pt-16 pb-10 text-center text-[14px] leading-relaxed">
            あなたが申請した、
            <br />
            住民票申請が最終承認されました。
            <br />
            <br />
            デジタル証明書を受け入れますか？
          </p>
          <div className="text-center">
            <button
              onClick={acceptHandler}
              disabled={disabled}
              className={
                disabled
                  ? 'input-form-button-gray w-[141px]'
                  : 'input-form-button-green w-[141px]'
              }
            >
              {disabled ? '受入済' : '受入れる'}
            </button>
          </div>
          <div className="text-center pt-10">
            <button
              onClick={buttonClickHandler}
              className="input-form-button-white-done w-[100px]"
            >
              VC一覧へ
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default VCAcceptMain;
