import React from 'react';
import './index.less';

/**
 * button 状态
 */
type ButtonStatus = 'success' | 'warning' | 'error';

interface IButtonProps {
  /**
   * button 类型
   */
  primary?: boolean;
  /**
   * button 状态
   */
  status?: ButtonStatus;
  /**
   * 是否禁用
   */
  disable?: Boolean;
  /**
   * 点击事件处理函数，可选
   */
  onClick?: () => void;
  label?: string;
  size?: string;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & IButtonProps;

export const Button: React.FC<ButtonProps> = function(props) {
  const { primary, status, children } = props;

  console.log('children :: ', React.version, primary, status, children);
  const clz = primary ? `button-primary` : 'button-default';

  return (
    <button className={clz}>{children}</button>
  )
};

export default Button;
