import { createContext, useEffect, useCallback, useState } from 'react';
import { Placement } from '../config/placement-type';

export type Trigger = 'click' | 'hover' | 'focus';

export interface IPopoverContext {
  placement: Placement;
  autoPlacement: (placement: Placement) => void;
  trigger: Trigger;
  visible: boolean;
  triggerVisible: (visible: boolean) => void;
}

export const PopoverContext = createContext<IPopoverContext>({
  placement: 'bottom',
  autoPlacement: () => {},
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
    setPlacement(initialPlacement);
  }, [initialPlacement]);
  useEffect(() => {
    setTrigger(initialTrigger);
  }, [initialTrigger]);
  useEffect(() => {
    setVisible(initialVisible);
  }, [initialVisible]);
  const autoPlacement = useCallback((newPlacement: Placement) => {
    setPlacement(newPlacement);
  }, []);
  const triggerVisible = useCallback((value: boolean) => {
    setVisible(value);
    onVisibleChange(value);
  }, []);
  return { placement, autoPlacement, visible, trigger, triggerVisible };
}
