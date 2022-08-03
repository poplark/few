import React from 'react';
import Classnames from 'classnames';

interface DropdownTriggerProps {
  className?: string;
}

export const DropdownTrigger: React.FC<React.PropsWithChildren<DropdownTriggerProps>> = (props) => {
  const { className, children, ...others } = props;
  const clz = Classnames('dropdown-trigger', className);
  return (
    <div className={clz} {...others}>
      {children}
    </div>
  )
}
