import React from 'react';
import Classnames from 'classnames';
import { ColorType } from '../config/color-type';
import { SizeType, getSizeClass } from '../config/size-type';

export interface IconProps {
  /**
   * 类型，目前仅支持了 fa 的图标，如 fa-home，可传入 home 既可
   */
  type: string;
  /**
   * 是否开启旋转动画
   */
  spin?: boolean;
  /**
   * CSS Class
   */
  className?: string;
  /**
   * CSS style
   */
  style?: React.CSSProperties;
  /**
   * 颜色
   */
  color?: ColorType;
  /**
   * 大小，默认 normal
   */
  size?: SizeType;
  onClick?: React.MouseEventHandler;
}

// todo - icon text
// todo - material design icon
// todo - ionicons
export const Icon: React.FC<IconProps> = (props) => {
  const { className, type, color, size, spin, ...others } = props;

  let textColor = '';
  switch (color) {
    case 'info':
    case 'success':
    case 'warning':
    case 'danger':
    case 'primary':
    case 'link':
      textColor = `has-text-${color}`;
      break;
    default:
      break;
  }
  const oClz = Classnames('icon', className, textColor, getSizeClass(size));

  let faSize = '';
  switch (size) {
    case 'small':
      faSize = 'fa-xs';
      break;
    case 'medium':
      faSize = 'fa-lg';
      break;
    case 'large':
      faSize = 'fa-xl';
      break;
    default:
      break;
  }
  const iClz = Classnames('fas', `fa-${type}`, spin? 'fa-pulse': '', faSize);
  return (
    <span className={oClz} {...others}>
      <i className={iClz}></i>
    </span>
  )
};

Icon.displayName = 'Icon';
Icon.defaultProps = {
  spin: false,
  size: 'normal',
}
