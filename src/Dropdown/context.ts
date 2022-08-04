import { createContext, useEffect, useCallback, useState } from 'react';

type CheckedItem = any | null;

export interface IDropdownContext {
  active: boolean;
  triggerActive: (active: boolean) => void;
  checked: CheckedItem;
  onCheck: (val: CheckedItem) => void;
}

export const DropdownContext = createContext<IDropdownContext>({
  active: false,
  triggerActive: () => {},
  checked: null,
  onCheck: () => {},
});

export function useDropdownContext(
  initialActive: boolean,
  initialValue?: CheckedItem,
): IDropdownContext {
  const [active, setActive] = useState(initialActive);
  const [checked, setChecked] = useState(initialValue);
  useEffect(() => {
    if (active !== initialActive) {
      setActive(initialActive);
    }
  }, [initialActive]);
  const triggerActive = useCallback((value: boolean) => {
    setActive(value);
  }, []);
  const onCheck = useCallback((value: CheckedItem) => {
    setChecked(value);
  }, []);
  return { active, triggerActive, checked, onCheck };
}
