import useDidInfo from './useDidInfo';

import { UseDidInfoParams } from './useDidInfo';

const Header = (params: UseDidInfoParams) => {
  const { name, did, balance } = useDidInfo(params);
  return (
    <div>
      <div className="flex">
        <div className="w-16">{name}</div>
        <div className="w-44">{did}</div>
        <div className="w-32 text-right">
          {balance && <span>{balance} ALGO</span>}
        </div>
      </div>
    </div>
  );
};

export default Header;
