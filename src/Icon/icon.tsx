import React from 'react';
import Classnames from 'classnames';
import { ColorType, getColorClass } from '../config/color-type';
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
   * 颜色
   */
  color?: ColorType;
  /**
   * 大小，默认 normal
   */
  size?: SizeType;
}

// todo - icon text
// todo - material design icon
// todo - ionicons
export const Icon: React.FC<IconProps> = (props) => {
  const { className, type, color, size, spin } = props;

  const oClz = Classnames('icon', className, getColorClass(color), getSizeClass(size));
  const iClz = Classnames('fas', `fa-${type}`, spin? 'fa-pulse': '');
  return (
    <span className={oClz}>
      <i className={iClz}></i>
    </span>
  )
};

Icon.displayName = 'Icon';
Icon.defaultProps = {
  spin: false,
  size: 'normal',
}
