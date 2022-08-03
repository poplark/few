import React, { useContext } from 'react';
import { SelectContext } from './context';

type OptionProps = React.OptionHTMLAttributes<HTMLOptionElement>;

export const Option: React.FC<OptionProps> = (props) => {
  const { children, ...others } = props;

  const ctx = useContext(SelectContext);

  console.log('select::option:: ', ctx.size);

  // todo - 使用 Dropdown 实现 Option
  return <option {...others}>{children}</option>;
}

Option.displayName = 'Option';

export function isOption(children: any): boolean {
  if (React.isValidElement(children) && children instanceof Option) {
    return true;
  }
  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement(child) || !(child instanceof Option)) {
      return false;
    }
  }
  return true;
}
