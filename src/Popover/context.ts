import { createContext, useEffect, useCallback, useState } from 'react';

export type Placement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export type Trigger = 'click' | 'hover' | 'focus';

export interface IPopoverContext {
  placement: Placement;
  trigger: Trigger;
  visible: boolean;
  triggerVisible: (visible: boolean) => void;
}

export const PopoverContext = createContext<IPopoverContext>({
  placement: 'bottom',
  visible: false,
  trigger: 'hover',
  triggerVisible: () => {},
});

interface PopoverContextInitialProps {
  placement: Placement,
  visible: boolean,
  trigger: Trigger,
  onVisibleChange: (visible: boolean) => void;
}

export function usePopoverContext(initialProps: PopoverContextInitialProps): IPopoverContext {
  const {
    placement: initialPlacement = 'bottom',
    visible: initialVisible = false,
    trigger: initialTrigger = 'hover',
    onVisibleChange = () => {},
  } = initialProps;
  const [placement, setPlacement] = useState(initialPlacement);
  const [trigger, setTrigger] = useState(initialTrigger);
  const [visible, setVisible] = useState(initialVisible);
  useEffect(() => {
    if (placement !== initialPlacement) {
      setPlacement(initialPlacement);
    }
  }, [initialPlacement]);
  useEffect(() => {
    if (trigger !== initialTrigger) {
      setTrigger(initialTrigger);
    }
  }, [initialTrigger]);
  useEffect(() => {
    if (visible !== initialVisible) {
      setVisible(initialVisible);
    }
  }, [initialVisible]);
  const triggerVisible = useCallback((value: boolean) => {
    setVisible(value);
    onVisibleChange(value);
  }, []);
  return { placement, visible, trigger, triggerVisible };
}
