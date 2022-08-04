import React, { useContext } from 'react';
import { SelectContext } from './context';

export type OptgroupProps = React.OptgroupHTMLAttributes<HTMLOptGroupElement>;

export const Optgroup: React.FC<OptgroupProps> = (
  props: OptgroupProps,
): JSX.Element => {
  const { children, ...others } = props;

  const ctx = useContext(SelectContext);

  console.log('select::optgroup:: ', ctx.size);
  return <optgroup {...others}>{children}</optgroup>;
};

Optgroup.displayName = 'Select.Optgroup';
