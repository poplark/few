import React from 'react';
import { isOption } from './option';

export type OptgroupProps = React.OptgroupHTMLAttributes<HTMLOptGroupElement>;

export const Optgroup = (props: OptgroupProps): JSX.Element => {
  const { children } = props;
  if (!isOption(children)) {
    throw new Error('options in optgroup is invalid!');
  }
  return <Optgroup>{children}</Optgroup>;
}

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
