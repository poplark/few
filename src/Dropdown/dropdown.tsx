import React from 'react';
import Classnames from 'classnames';
import { Button } from '../Button';
import { DropdownItem, DropdownItemProps } from './dropdown-item';

interface IDropdownProps {
  trigger?: 'click' | 'hover';
  items?: Array<React.ReactElement<DropdownItemProps, typeof DropdownItem>>;
}

export type DropdownProps = React.HTMLAttributes<HTMLElement> & IDropdownProps

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const { items, children } = props;

  return (
    <div className="dropdown is-active">
      <div className="dropdown-trigger">
        {children}
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content">
          {
            React.Children.map(items, (item) => {
              return item;
            })
          }
        </div>
      </div>
    </div>
  )
}

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
  trigger: 'hover',
}
