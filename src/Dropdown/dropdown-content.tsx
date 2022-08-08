import React from 'react';
import { PopoverContent, PopoverContentProps } from '../Popover';

export type DropdownContentProps = PopoverContentProps;

export const DropdownContent: React.FC<React.PropsWithChildren<DropdownContentProps>> = (props) => {
  const { children, ...others } = props;

  console.log('DropdownContent::render::');
  return (
    <PopoverContent {...others}>{children}</PopoverContent>
  );
}

DropdownContent.displayName = 'DropdownContent';
