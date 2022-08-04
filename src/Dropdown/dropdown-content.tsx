import React from 'react';
import Classnames from 'classnames';

export interface DropdownContentProps {
  className?: string;
}

export const DropdownContent: React.FC<
  React.PropsWithChildren<DropdownContentProps>
> = (props) => {
  const { className, children, ...others } = props;
  const clz = Classnames('dropdown-content', className);

  console.log('DropdownContent::render::');
  return (
    <div className="dropdown-menu">
      <div className={clz} {...others}>
        {children}
      </div>
    </div>
  );
};

DropdownContent.displayName = 'DropdownContent';
