import React from 'react';
import Classnames from 'classnames';

export interface MenuItemProps {
  key: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler;
}

export const MenuItem: React.FC<React.PropsWithChildren<MenuItemProps>> = (
  props,
) => {
  const { active, disabled, className, children, ...others } = props;

  const clz = Classnames(className, {
    'is-active': active,
    disabled: disabled,
  });
  return (
    <li>
      <a className={clz} {...others}>
        {children}
      </a>
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
MenuItem.defaultProps = {
  active: false,
  disabled: false,
  onClick: () => {},
};
