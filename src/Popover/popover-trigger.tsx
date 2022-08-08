import React from 'react';
import Classnames from 'classnames';

export interface PopoverTriggerProps {
  className?: string;
  onClick?: (evt: React.MouseEvent) => void;
}

const InnerPopoverTrigger: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.PropsWithChildren<PopoverTriggerProps>
> = (props, ref) => {
  const { className, children, ...others } = props;
  const _ref = ref || React.createRef<HTMLDivElement>();
  const clz = Classnames('dropdown-trigger', className);

  console.log('PopoverTrigger::render::');
  return (
    <div className={clz} ref={_ref} {...others}>
      {children}
    </div>
  );
};

export const PopoverTrigger = React.forwardRef(InnerPopoverTrigger);

PopoverTrigger.displayName = 'PopoverTrigger';
PopoverTrigger.defaultProps = {
  onClick: () => {},
};
