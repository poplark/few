import React from 'react';
import Classnames from 'classnames';

interface DropdownTriggerProps {
  className?: string;
}

const InnerDropdownTrigger: React.ForwardRefRenderFunction<HTMLDivElement, React.PropsWithChildren<DropdownTriggerProps>> = (props, ref) => {
  const { className, children, ...others } = props;
  const _ref = ref || React.createRef<HTMLDivElement>();
  const clz = Classnames('dropdown-trigger', className);
  return (
    <div className={clz} ref={_ref} {...others}>
      {children}
    </div>
  )
}

export const DropdownTrigger = React.forwardRef(InnerDropdownTrigger);

DropdownTrigger.displayName = 'DropdownTrigger';
