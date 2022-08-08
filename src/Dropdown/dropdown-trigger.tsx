import React from 'react';
import { PopoverTrigger, PopoverTriggerProps } from '../Popover';

export type DropdownTriggerProps = PopoverTriggerProps;

export const DropdownTrigger: React.FC<React.PropsWithChildren<DropdownTriggerProps>> = (props) => {
  const { children, ...others } = props;

  console.log('DropdownTrigger::render::');
  return (
    <PopoverTrigger {...others}>{children}</PopoverTrigger>
  );
}

DropdownTrigger.displayName = 'DropdownTrigger';
