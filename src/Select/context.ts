import React, { createContext, useState, useReducer, useEffect } from 'react';
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
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  options?: OptionProps[];
  mode: 'single' | 'multi';
  onChange?: (v?: string | number | (string | number)[]) => void;
}

interface SelectAction {
  type: SelectActionType;
  payload?: OptionProps | OptionProps[];
}
// todo SelectAction['type'] 为 clear 时，payload 为 undefined

export const useSelectContext = (
  props: SelectContextProps,
): SelectContextValue => {
  const { size = 'normal', mode = 'single', value, defaultValue, options = [], onChange = () => {} } = props;
  const [isSingle] = useState(() => mode !== 'multi');

  const [selected, dispatch] = useReducer(
    (state: OptionProps[], action: SelectAction): OptionProps[] => {
      switch (action.type) {
        case 'replace':
          state = ([] as OptionProps[]).concat(action.payload as OptionProps | OptionProps[]);
          break;
        case 'add':
          state = state.concat(action.payload!);
          break;
        case 'remove':
          state = state.filter((item) => item.value !== (action.payload as OptionProps).value);
          break;
        case 'clear':
          state = [];
          break;
      }
      // todo - 有没有其他好地方处理这个对外的通知？？？
      // 使用 useEffect，但首次有个多余的 onChange 如何破
      // const newValues = state.map((item) => item.value);
      // Promise.resolve().then(() => isSingle ? onChange(newValues[0]) : onChange(newValues));
      return state;
    },
    [],
    () => {
      const values = value || defaultValue;
      if (isSingle) {
        return options.filter((option) => option.value === values);
      } else {
        return options.filter((option) =>
          Array.isArray(values) && values.includes(option.value)
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

  useEffect(() => {
    const payload = options.filter((option) => {
      if (isSingle) {
        return value === option.value;
      } else {
        return Array.isArray(value) && value.includes(option.value);
      }
    });
    dispatch({ type: 'replace', payload });
  }, [value]);

  useEffect(() => {
    // todo - 初次 render 时，也会触发一次 onChange，咋办
    const values = selected.map((item) => item.value);
    isSingle ? onChange(values[0]) : onChange(values);
  }, [selected]);

  return {
    size,
    selected,
    onSelect,
  };
};
