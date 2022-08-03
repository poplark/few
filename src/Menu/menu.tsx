import React from 'react';
import Classnames from 'classnames';

interface MenuProps {
  label?: string;
  className?: string;
  onClick?: (evt: React.MouseEvent, key: string) => void;
}

export const Menu: React.FC<React.PropsWithChildren<MenuProps>> = (props) => {
  const { label, className, onClick, children, ...others } = props;
  const clz = Classnames(className, 'menu');

  const renderLabel = (label?: string): JSX.Element | null => {
    if (label) {
      return <p className="menu-label">{label}</p>;
    }
    return null;
  }

  return (
    <div className={clz} {...others}>
      { renderLabel(label) }
      <ul className="menu-list">
        { children }
      </ul>
    </div>
  )
}

Menu.displayName = 'Menu';
Menu.defaultProps = {
  onClick: () => {}
}
