import React, { useEffect, useRef } from 'react';
import Classnames from 'classnames';
import { ColorType, getColorClass } from '../config/color-type';
import { Placement, getPlacementClass } from '../config/placement-type';
import { PopoverContext, usePopoverContext, Trigger } from './context';

export interface IPopoverProps {
  color?: ColorType;
  trigger?: Trigger;
  visible?: boolean;
  placement?: Placement;
  onVisibleChange?: (visible: boolean) => void;
  className?: string;
}


export type PopoverProps = React.HTMLAttributes<HTMLElement> & IPopoverProps;

export const Popover: React.FC<PopoverProps> = (props) => {
  const { color, trigger = 'hover', visible = false, placement = 'bottomLeft', onVisibleChange = () => {}, className, children, ...others } = props;

  const ctx = usePopoverContext({
    placement,
    visible,
    trigger,
    onVisibleChange,
  });

  const open = (evt: React.MouseEvent): void => {
    if (trigger !== 'hover') return;
    if (ctx.visible) return;
    ctx.triggerVisible(true);
  };
  const close = (evt: React.MouseEvent): void => {
    if (trigger !== 'hover') return;
    if (!ctx.visible) return;
    ctx.triggerVisible(false);
  };

  const clz = Classnames('dropdown', {
    'is-active': ctx.visible,
  }, getPlacementClass(ctx.placement));

  console.log('Popover::render::');
  return (
    <PopoverContext.Provider value={ctx}>
      <div className={clz} onMouseEnter={open} onMouseLeave={close} {...others}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

Popover.displayName = 'Popover';
Popover.defaultProps = {
  trigger: 'hover',
  visible: false,
  placement: 'bottomLeft',
  onVisibleChange: () => {},
}
