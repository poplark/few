import React from 'react';
import Classnames from 'classnames';

export interface PopoverContentProps {
  className?: string;
}

export const PopoverContent: React.FC<
  React.PropsWithChildren<PopoverContentProps>
> = (props) => {
  const { className, children, ...others } = props;
  const clz = Classnames('dropdown-content', className);

  console.log('PopoverContent::render::');
  return (
    <div className="dropdown-menu">
      <div className={clz} {...others}>
        {children}
      </div>
    </div>
  );
};

PopoverContent.displayName = 'PopoverContent';
