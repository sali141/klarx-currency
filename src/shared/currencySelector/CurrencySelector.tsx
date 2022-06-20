import React, { memo } from "react";
import Select from "react-select";
import { TCurrency } from "../../types/currencyTypes";

type Props = {
  value : TCurrency | TCurrency[] | undefined;
  options: TCurrency[];
  onSelect: (e: any) => void;
  isMulti: boolean;
  isClearable: boolean;
};

const CurrencySelector: React.FC<Props> = (props: Props) => {
  const {value, options, isMulti, isClearable, onSelect } = props;
  return (
      <Select
        options={options}
        isMulti={isMulti}
        onChange={onSelect}
        isClearable={isClearable}
        value={value}
      />
  );
};

export default memo(CurrencySelector);
