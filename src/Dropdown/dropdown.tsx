import React from 'react';
import { Popover } from '../Popover';

export interface DropdownProps {
  visible?: boolean;
  trigger?: 'click' | 'hover';
}

export const Dropdown: React.FC<React.PropsWithChildren<DropdownProps>> = (props) => {
  const { visible, trigger, children } = props;

  console.log('Dropdown::render::');

  return (
    <Popover visible={visible} trigger={trigger}>
      {children}
    </Popover>
  );
};

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
  visible: false,
  trigger: 'hover',
};
