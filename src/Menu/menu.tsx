import React from 'react';
import Classnames from 'classnames';
import { MenuItem, MenuItemProps } from './menu-item';

export interface MenuProps {
  label?: string;
  className?: string;
  onClick?: (evt: React.MouseEvent, key: string) => void;
}

export const Menu: React.FC<React.PropsWithChildren<MenuProps>> = (props) => {
  const { label, className, onClick, children, ...others } = props;
  const clz = Classnames(className, 'menu');

  const renderChild = (child: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(child) && child.type === MenuItem) {
      const { props, key } = child as React.ReactElement<
        MenuItemProps,
        typeof MenuItem
      >;
      const originalOnClick = props.onClick;
      const _onClick = (evt: React.MouseEvent): void => {
        if (!props.disabled) {
          originalOnClick && originalOnClick(evt);
          onClick && onClick(evt, `${key}`);
        }
      };
      return React.cloneElement(
        child,
        Object.assign({}, props, { onClick: _onClick }),
      );
    }
    return child;
  };

  console.log('Menu::render::');
  return (
    <div className={clz} {...others}>
      {label ? <p className="menu-label">{label}</p> : null}
      <ul className="menu-list">{React.Children.map(children, renderChild)}</ul>
    </div>
  );
};

Menu.displayName = 'Menu';
Menu.defaultProps = {
  onClick: () => {},
};
