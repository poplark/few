import React, { useState } from 'react';
import Classnames from 'classnames';
import { ColorType, getColorClass } from '../config/color-type';
import { SizeType, getSizeClass } from '../config/size-type';
import { StateType, getStateClass } from '../config/state-type';
import { SelectContext, useSelectContext } from './context';
import { Option, OptionProps } from './option';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Menu } from '../Menu';

export interface SelectProps {
  /**
   * 边框颜色
   */
  color?: ColorType;
  /**
   * 大小
   */
  iSize?: SizeType;
  /**
   * 状态
   */
  state?: StateType;
  disabled?: boolean;
  value?: string | number | (string | number)[]
  defaultValue?: string | number | (string | number)[];
  mode?: 'single' | 'multi';
  onChange?: (v: string | number | (string | number)[]) => void;
  placeholder?: string;
}

export const Select = (props: React.PropsWithChildren<SelectProps>): JSX.Element => {
  const {
    color,
    iSize,
    mode = 'single',
    state,
    disabled,
    defaultValue,
    value,
    children,
    onChange,
    placeholder,
    ...others
  } = props;

  const [isSingle] = useState(() => mode !== 'multi');
  // check children is option or optgroup
  // if (!isOptgroup(children) || !isOption(children)) {
  //   throw new Error('option or optgroup are invalid.');
  // }

  const kClz = getColorClass(color);
  const sClz = getSizeClass(iSize) || 'is-normal';
  const stClz = getStateClass(state);
  const dClz = disabled ? 'disabled' : '';
  const clz = Classnames('select-bar', kClz, sClz, stClz, dClz);

  const options = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Option) {
      const _child = child as React.ReactElement<OptionProps>;
      return _child.props;
    } else {
      console.warn('not an invalid Option');
    }
  })?.filter((item) => item);

  // todo - 取 defaultValue 还是 value
  const ctx = useSelectContext({
    size: iSize,
    mode,
    values: value || defaultValue,
    options,
    onChange,
  });

  return (
    <SelectContext.Provider value={ctx}>
      <Popover trigger='click'>
        <PopoverTrigger>
          <Button className={clz}>
            {
              ctx.selected.length > 0 ? ctx.selected.map((item) => item.title).join('/') : placeholder
            }
            <Icon type="angle-down" style={{marginLeft: '4px'}}/>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Menu>
            {children}
          </Menu>
        </PopoverContent>
      </Popover>
    </SelectContext.Provider>
  );
};

Select.displayName = 'Select';
Select.defaultProps = {
  color: 'default',
  iSize: 'normal',
  placeholder: '请选择一项',
};
