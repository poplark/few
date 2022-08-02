import React, { useState, useEffect, useRef } from 'react';
import Classnames from 'classnames';
import SizeType from '../config/size-type';

type InputColor =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';
type InputState = 'hover' | 'focus' | 'active' | 'loading';

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
  color?: InputColor;
  /**
   * 输入框大小
   */
  iSize?: SizeType;
  /**
   * 输入框状态
   */
  state?: InputState;
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & IInputProps;

const InnerInput = (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { defaultValue, value, iSize, state, disabled, onChange, ...others } = props;

  console.log('input props:: ', defaultValue, value, iSize, state, disabled);

  const _ref = ref || React.createRef<HTMLInputElement>();

  const _onChange = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (!disabled) {
      onChange && onChange(evt);
    }
  }, [disabled, onChange]);

  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    }
  }, []);

  let _value: string;
  if (!isMounted) {
    _value = value || defaultValue || '';
  } else {
    _value = value as string;
  }

  return <input value={_value} ref={_ref} onChange={_onChange} {...others}></input>;
}

export const Input = React.forwardRef(InnerInput);

Input.displayName = 'Input';
Input.defaultProps = {
  iSize: 'nm',
}
