import { createContext, useEffect, useCallback, useState } from 'react';

export type Placement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export interface IPopoverContext {
  placement: Placement;
  visible: boolean;
  triggerVisible: (visible: boolean) => void;
}

export const PopoverContext = createContext<IPopoverContext>({
  placement: 'bottom',
  visible: false,
  triggerVisible: () => {},
});

export function usePopoverContext(
  initialPlacement: Placement,
  initialVisible: boolean,
): IPopoverContext {
  const [placement, setPlacement] = useState(initialPlacement);
  const [visible, setVisible] = useState(initialVisible);
  useEffect(() => {
    if (placement !== initialPlacement) {
      setPlacement(initialPlacement);
    }
  }, [initialPlacement]);
  useEffect(() => {
    if (visible !== initialVisible) {
      setVisible(initialVisible);
    }
  }, [initialVisible]);
  const triggerVisible = useCallback((value: boolean) => {
    setVisible(value);
  }, []);
  return { placement, visible, triggerVisible };
}
