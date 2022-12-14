import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Header from '@/components/Header';
import { residentVCListState, residentVCRequestListState, VCListState } from '@/lib/states/mockApp';
import { verifyVerifiableMessage, createVerifiableCredential } from '@/lib/algosbt';
import { getAlgod } from '@/lib/algo/algod/algods';
import chainState from '@/lib/states/chainState';
import holderDidAccountState from '@/lib/states/holderDidAccountState';
import issuerDidAccountState from '@/lib/states/issuerDidAccountState';

import { issuerPw } from '@/lib/algo/account/accounts';
import { useState } from 'react';

const ResidentListDetailMain = () => {
  const router = useRouter();

  const [listState, setListState] = useRecoilState(residentVCRequestListState);
  const setVCList = useSetRecoilState(residentVCListState);
  const setIssuedVCList = useSetRecoilState(VCListState);
  const [isIssuing, setIsIssuing] = useState(false)

  const selectDetail = listState.find((v) => v.message.content.id === Number(router.query.id));

  const [chainType] = useRecoilState(chainState);
  const [holderDidAccountGlobal] = useRecoilState(holderDidAccountState);
  const [issuerDidAccountGlobal] = useRecoilState(issuerDidAccountState);


  const onSubmit = async (status: boolean, pathname: string) => {
    if (selectDetail && holderDidAccountGlobal && issuerDidAccountGlobal) {
      setIsIssuing(true);
      const verified = verifyVerifiableMessage(selectDetail);

      if (verified) {
        const algod = getAlgod(chainType);
        const content = selectDetail.message.content;
        const vcContent = {
          ...content,
          verifyStatus: status,
          approvalStatus: status,
        };
        const vc = await createVerifiableCredential(
          algod,
          issuerDidAccountGlobal,
          holderDidAccountGlobal.did,
          vcContent,
          issuerPw
        );
        setListState((items) => items.filter((item) => item.message.content.id != content.id));
        setVCList((items) => [...items, vc]);
        setIssuedVCList((items) => ({ ...items, resident: { VC: vc, acceptStatus: false } }));
        setIsIssuing(false);
        router.push({ pathname, query: { id: router.query.id } });
      }
    }
  };

  return (
    <>
      <Header menuType={2} menuTitle={'???????????????????????????'} />
      <main className="bg-color-background">
        <div className="pt-[31px] px-[27px] pb-[41px] text-input-form-text font-bold">
          <h2>??????????????????</h2>
        </div>
        <div className="py-0 px-[53px]">
          <div className="input-form-label">??????</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.message.content.fullName : ''}
          </div>
          <div className="input-form-label">??????????????????</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.message.content.fullNameFurigana : ''}
          </div>
          <div className="input-form-label">??????</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.message.content.address : ''}
          </div>
          <div className="input-form-label">????????????????????????</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.message.content.addressRegistDate : ''}
          </div>
          <div className="input-form-label">?????????</div>
          <div className="input-form-text-box-confirm">
            {selectDetail ? selectDetail.message.content.permanentAddress : ''}
          </div>
          <div className={"h-7 relative"}>
            {isIssuing
              ? <span className={"absolute right-0 bottom-0 text-sm leading-relaxed text-yellow-500"}>VC?????????...</span>
              : null
            }
          </div>
          <div className="pt-4 flex justify-between">
            <button
              onClick={() => onSubmit(false, '/14_resident-list')}
              className="input-form-button-white"
            >
              ??????
            </button>
            <button
              onClick={() => onSubmit(true, '/16_resident-list-done')}
              className="input-form-button-blue"
            >
              ??????
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResidentListDetailMain;
