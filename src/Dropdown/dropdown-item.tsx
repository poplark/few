import React from 'react';
import Classnames from 'classnames';

export interface DropdownItemProps {
  label: string;
  active?: boolean;
}

export type DropdownItemSchema = DropdownItemProps & { key: string };

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { label, active, ...others } = props;
  console.log("DropdownItem::props:: ", others);

  const clz = Classnames('dropdown-item', { 'is-active': active });
  return (
    <a className={clz} {...others}>
      {label}
    </a>
  )
};

DropdownItem.displayName = 'DropdownItem';
DropdownItem.defaultProps = {
  active: false,
}
