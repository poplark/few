import React from 'react';
import Classnames from 'classnames';
import { Popover, PopoverTrigger, PopoverContent } from '../Popover';
import { Placement } from '../config/placement-type';

export interface TooltipProps {
  title?: React.ReactNode;
  placement?: Placement;
  visible?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = (props) => {
  const { title, placement, visible, className, style, children, ...others } = props;
  const clz = Classnames('tooltip-content', className);
  return (
    <Popover placement={placement} visible={visible} style={style}>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent arrow className={clz} {...others}>
        {title}
      </PopoverContent>
    </Popover>
  )
}
Tooltip.displayName = 'Tooltip';
Tooltip.defaultProps = {
  title: '',
  placement: 'top',
  visible: false,
};
