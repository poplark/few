import React, { useContext } from 'react';
import { SelectContext } from './context';
import { MenuItem } from '../Menu';

export interface OptionProps {
  className?: string;
  disabled?: boolean;
  value: string | number;
  title: string;
  key: string;
}

export const Option: React.FC<OptionProps> = (props) => {
  const { value, title, ...others } = props;

  const ctx = useContext(SelectContext);

  const isSelected = !!ctx.selected.find((item) => item.value === value);
  const onSelect = (evt: React.MouseEvent) => {
    if (props.disabled || isSelected) return;
    ctx.onSelect(props);
  }

  return (
    <MenuItem onClick={onSelect} active={isSelected} {...others}>
      {title}
    </MenuItem>
  );
};

Option.displayName = 'Option';
Option.defaultProps = {
  disabled: false,
};
