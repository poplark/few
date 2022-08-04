import React, { useState, useEffect, useRef } from 'react';
import Classnames from 'classnames';
import { ColorType, getColorClass } from '../config/color-type';
import { SizeType, getSizeClass } from '../config/size-type';
import { StateType, getStateClass } from '../config/state-type';

interface IInputProps {
  /**
   * 初始值
   */
  defaultValue?: string;
  /**
   * 值，传入时，defaultValue 将失效
   */
  value?: string;
  /**
   * 输入框颜色
   */
  iColor?: ColorType;
  /**
   * 输入框大小
   */
  iSize?: SizeType;
  /**
   * 输入框状态
   */
  state?: StateType;
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  IInputProps;

const InnerInput = (
  props: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
): JSX.Element => {
  const {
    defaultValue,
    value,
    iColor,
    iSize,
    state,
    disabled,
    onChange,
    ...others
  } = props;

  console.log('input props:: ', defaultValue, value, iSize, state, disabled);

  const _ref = ref || React.createRef<HTMLInputElement>();

  const _onChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>): void => {
      if (!disabled) {
        onChange && onChange(evt);
      }
    },
    [disabled, onChange],
  );

  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const kClz = getColorClass(iColor);
  const sClz = getSizeClass(iSize) || 'is-normal';
  const stClz = getStateClass(state);
  const dClz = disabled ? 'disabled' : '';
  const clz = Classnames('input', kClz, sClz, stClz, dClz);

  let _value: string;
  if (!isMounted) {
    _value = value || defaultValue || '';
  } else {
    _value = value as string;
  }

  return (
    <input
      className={clz}
      value={_value}
      ref={_ref}
      onChange={_onChange}
      {...others}
    ></input>
  );
};

export const Input = React.forwardRef(InnerInput);

Input.displayName = 'Input';
Input.defaultProps = {
  iSize: 'normal',
};
