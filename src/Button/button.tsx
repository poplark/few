import React from 'react';
import Classnames from 'classnames';
import { ColorType, getColorClass } from '../config/color-type';
import { SizeType, getSizeClass } from '../config/size-type';
import { StateType, getStateClass } from '../config/state-type';

interface IButtonProps {
  /**
   * button 类型，默认 'default'
   */
  kind?: ColorType | 'default';
  /**
   * button 大小，默认 'normal'
   */
  size?: SizeType;
  /**
   * 自定义样式
   */
  className?: string;
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
  const { kind, size, className, state, disabled, href, onClick, children, ...others } =
    props;

  const _onClick = React.useCallback(
    (evt: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
      // evt.stopPropagation();
      if (!disabled) {
        onClick && onClick(evt);
      }
    },
    [disabled, onClick],
  );

  const kClz = getColorClass(kind as ColorType) || '';
  const sClz = getSizeClass(size) || 'is-normal';
  const stClz = getStateClass(state);
  const dClz = disabled ? 'disabled' : '';
  const clz = Classnames('button', kClz, sClz, stClz, dClz, className);

  if (kind === 'link' && !!href) {
    return (
      <a className={clz} href={href} onClick={_onClick} {...others}>
        {children}
      </a>
    );
  }

  return (
    <button className={clz} disabled={disabled} onClick={_onClick} {...others}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';

Button.defaultProps = {
  kind: 'default',
  size: 'normal',
  onClick: () => {},
};

export { Button };
