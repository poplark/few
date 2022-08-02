import React, { useState, useEffect, createRef } from 'react';
import Classnames from 'classnames';
import { ColorType, getColorClass } from '../config/color-type';
import { SizeType, getSizeClass } from '../config/size-type';
import { StateType, getStateClass } from '../config/state-type';
import { SelectContext } from './context';
import { isOptgroup } from './optgroup';
import { isOption } from './option';

interface ISelectProps {
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
}

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & ISelectProps;

const InnerSelect = (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>): JSX.Element => {
  const { color, iSize, state, disabled, children, ...others } = props;
  const _ref = ref || createRef<HTMLSelectElement>();

  // check children is option or optgroup
  if (!isOptgroup(children) || !isOption(children)) {
    throw new Error('option or optgroup are invalid.');
  }

  const kClz = getColorClass(color);
  const sClz = getSizeClass(iSize) || 'is-normal';
  const stClz = getStateClass(state);
  const dClz = disabled ? 'disabled' : '';
  const clz = Classnames('select', kClz, sClz, stClz, dClz);

  return (
    <SelectContext.Provider value={{size: iSize || 'normal'}}>
      <select className={clz} ref={_ref} {...others}>
        {children}
      </select>
    </SelectContext.Provider>
  )
}

const Select = React.forwardRef(InnerSelect);

Select.displayName = 'Select';
Select.defaultProps = {
  color: 'primary',
  iSize: 'normal',
}

export { Select };
