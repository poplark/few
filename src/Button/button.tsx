import React from 'react';
import Classnames from 'classnames';
import SizeType from '../config/size-type';

type ButtonKind = 'default' | 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
type ButtonState = 'hover' | 'focus' | 'active' | 'loading';

interface IButtonProps {
  /**
   * button 类型，默认 'default'
   */
  kind?: ButtonKind;
  /**
   * button 大小，默认 'nm'
   */
  size?: SizeType;
  /**
   * button 状态
   */
  state?: ButtonState;
  /**
   * type 为 link 时有效
   */
  href?: string;
  /**
   * 点击事件处理函数，可选
   */
  onClick?: () => void;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & IButtonProps;

const Button: React.FC<ButtonProps> = function(props) {
  const { kind, size, state, disabled, href, children, ...others } = props;

  console.log('button props:: ', kind, size, state, disabled, href, children);
  let kClz = 'default';
  switch (kind) {
    case 'primary':
      kClz = 'is-primary';
      break;
    case 'info':
      kClz = 'is-info';
      break;
    case 'success':
      kClz = 'is-success';
      break;
    case 'warning':
      kClz = 'is-warning';
      break;
    case 'danger':
      kClz = 'is-danger';
      break;
    case 'link':
      kClz = 'is-link';
      break;
    default:
      break;
  }

  let sClz = 'md';
  switch (size) {
    case 'lg':
      sClz = 'lg';
      break;
    case 'sm':
      sClz = 'sm';
      break;
    default:
      break;
  }
  let stClz = '';
  switch (state) {
    case 'active':
      stClz = 'is-active';
      break;
    case 'hover':
      stClz = 'is-hovered';
      break;
    case 'focus':
      stClz = 'is-focused';
      break;
    case 'loading':
      stClz = 'is-loading';
      break;
  }
  let dClz = disabled ? 'disabled' : '';
  const clz = Classnames('button', kClz, sClz, stClz, dClz);

  if (kind === 'link' && !!href) {
    return <a className={clz} href={href} {...others}>{children}</a>;
  }

  return <button className={clz} {...others}>{children}</button>;
};

Button.displayName = 'Button';

Button.defaultProps = {
  kind: 'default',
  size: 'nm',
  onClick: () => {},
}

export {
  Button
}
