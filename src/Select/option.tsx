import React, { useContext } from 'react';
import Classnames from 'classnames';
import { SelectContext } from './context';

export interface OptionProps {
  className?: string;
  disabled?: boolean;
  value: string | number;
  title: string;
  key: string;
}

export const Option: React.FC<OptionProps> = (props) => {
  const { className, disabled, value, title, ...others } = props;

  const ctx = useContext(SelectContext);
  const isSelected = !!ctx.selected.find((item) => item.value === value);
  const clz = Classnames(
    className,
    { disabled: disabled },
    { 'is-active': isSelected },
  );

  return (
    <li>
      <a className={clz} {...others}>
        {title}
      </a>
    </li>
  );
};

Option.displayName = 'Option';
Option.defaultProps = {
  disabled: false,
};
