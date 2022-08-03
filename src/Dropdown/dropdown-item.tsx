import React from 'react';
import Classnames from 'classnames';

interface IDropdownItemProps {
  active?: boolean;
}

export type DropdownItemProps = React.OptionHTMLAttributes<HTMLOptionElement> & IDropdownItemProps;

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { active, children, ...others } = props;
  console.log("DropdownItem::props:: ", others);

  const clz = Classnames('dropdown-item', { 'is-active': active });
  return (
    <li className={clz}>
      {children}
    </li>
  )
};

DropdownItem.displayName = 'DropdownItem';
DropdownItem.defaultProps = {
  active: false,
}
