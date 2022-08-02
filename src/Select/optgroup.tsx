import React, { useContext } from 'react';
import { SelectContext } from './context';
import { isOption } from './option';

export type OptgroupProps = React.OptgroupHTMLAttributes<HTMLOptGroupElement>;

export const Optgroup: React.FC<OptgroupProps> = (props: OptgroupProps): JSX.Element => {
  const { children, ...others } = props;
  if (!isOption(children)) {
    throw new Error('options in optgroup is invalid!');
  }

  const ctx = useContext(SelectContext);

  console.log('select::optgroup:: ', ctx.size);
  return <optgroup {...others}>{children}</optgroup>;
}

Optgroup.displayName = 'Select.Optgroup';

export function isOptgroup(children: React.ReactNode): boolean {
  if (React.isValidElement(children) && children instanceof Optgroup) {
    return true;
  }
  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement(child) || !(child instanceof Optgroup)) {
      return false;
    }
  }
  return true;
}
