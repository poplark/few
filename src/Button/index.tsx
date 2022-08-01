import React from 'react';
import './index.less';

/**
 * button 类型
 */
type ButtonType = 'default' | 'primary';
type ButtonStatus = 'success' | 'warning' | 'error';

interface IButtonProps {
  /**
   * button 类型
   */
  type: ButtonType;
  /**
   * button 状态
   */
  status: ButtonStatus;
  disable: Boolean;
  /**
   * A description of the prop that you seem fit :)
   */
   kind: 'primary' | 'secondary' | 'cancel' | 'dark' | 'gray';
}

export type ButtonProps = React.ButtonHTMLAttributes<IButtonProps>

export const Button: React.FunctionComponent<ButtonProps> = function(props) {
  const { type, children } = props;

  const clz = `button-${type}`;

  return (
    <button className={clz}>{children}</button>
  )
}

export default Button;
