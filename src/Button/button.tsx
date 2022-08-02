import React from 'react';
import Classnames from 'classnames';
import ColorType from '../config/color-type';
import SizeType from '../config/size-type';
import StateType from '../config/state-type';

interface IButtonProps {
  /**
   * button 类型，默认 'primary'
   */
  kind?: ColorType;
  /**
   * button 大小，默认 'normal'
   */
  size?: SizeType;
  /**
   * button 状态
   */
  state?: StateType;
  /**
   * kind 为 link 时有效
   */
  href?: string;
  /**
   * 点击事件处理函数，可选
   */
  onClick?: (
    evt: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  IButtonProps;

const Button: React.FC<ButtonProps> = function (props) {
  const {
    kind,
    size,
    state,
    disabled,
    href,
    onClick,
    children,
    ...others
  } = props;

  let kClz = '';
  switch (kind) {
    case 'primary':
    case 'info':
    case 'success':
    case 'warning':
    case 'danger':
    case 'link':
      kClz = `is-${kind}`;
      break;
    default:
      break;
  }

  let sClz = 'is-normal';
  switch (size) {
    case 'large':
    case 'medium':
    case 'normal':
    case 'small':
      sClz = `is-${size}`;
      break;
    default:
      break;
  }
  let stClz = '';
  switch (state) {
    case 'active':
    case 'hovered':
    case 'focused':
    case 'loading':
      stClz = `is-${state}`;
      break;
    default:
      break;
  }
  let dClz = disabled ? 'disabled' : '';
  const clz = Classnames('button', kClz, sClz, stClz, dClz);

  const _onClick = React.useCallback(
    (evt: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
      evt.stopPropagation();
      if (!disabled) {
        onClick && onClick(evt);
      }
    },
    [disabled, onClick],
  );

  if (kind === 'link' && !!href) {
    return (
      <a
        className={clz}
        href={href}
        onClick={_onClick}
        {...others}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={clz}
      disabled={disabled}
      onClick={_onClick}
      {...others}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';

Button.defaultProps = {
  kind: 'primary',
  size: 'normal',
  onClick: () => {},
};

export { Button };
