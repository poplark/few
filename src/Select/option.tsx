import React from 'react';

interface OptionProps {
}

const Option = (props: OptionProps): JSX.Element => {
  return <option></option>;
}

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
