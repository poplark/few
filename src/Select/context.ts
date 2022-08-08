import React, { createContext, useState, useReducer } from 'react';
import { SizeType } from '../config/size-type';
import { OptionProps } from './option';

type SelectActionType = 'add' | 'remove' | 'replace' | 'clear';

interface SelectContextValue {
  size: SizeType;
  selected: OptionProps[];
  onSelect: (val?: OptionProps) => void;
}

export const SelectContext = createContext<SelectContextValue>({
  size: 'normal',
  selected: [],
  onSelect: () => {},
});

interface SelectContextProps {
  size?: SizeType;
  values?: string | number | (string | number)[];
  options?: OptionProps[];
  mode: 'single' | 'multi';
  onChange?: (v: string | number | (string | number)[]) => void;
}

interface SelectAction {
  type: SelectActionType;
  payload?: OptionProps;
}

export const useSelectContext = (
  props: SelectContextProps,
): SelectContextValue => {
  const { size = 'normal', mode = 'single', values, options = [], onChange = () => {} } = props;
  const [isSingle] = useState(() => mode !== 'multi');

  const [selected, dispatch] = useReducer(
    (state: OptionProps[], action: SelectAction): OptionProps[] => {
      switch (action.type) {
        case 'replace':
          state = [action.payload!];
          break;
        case 'add':
          state = state.concat(action.payload!);
          break;
        case 'remove':
          state = state.filter((item) => item.value !== action.payload!.value);
          break;
        case 'clear':
          state = [];
          break;
      }
      // todo - 有没有其他好地方处理这个对外的通知？？？
      const newValues = state.map((item) => item.value);
      Promise.resolve().then(() => isSingle ? onChange(newValues[0]) : onChange(newValues));
      return state;
    },
    [],
    () => {
      if (isSingle) {
        return options.filter((option) => option.value === values);
      } else {
        return options.filter((option) =>
          ((values as (string | number)[]) || []).includes(option.value),
        );
      }
    },
  );
  const onSelect = (val?: OptionProps) => {
    if (val) {
      if (isSingle) {
        dispatch({ type: 'replace', payload: val });
      } else {
        if (selected.find((item) => item.value === val.value)) {
          dispatch({ type: 'remove', payload: val });
        } else {
          dispatch({ type: 'add', payload: val });
        }
      }
    } else {
      dispatch({ type: 'clear' });
    }
  };

  return {
    size,
    selected,
    onSelect,
  };
};
