/**
 * primary - 主色
 * link - 链接色
 * info - 信息色
 * success - 成功色
 * warning - 警告色
 * danger - 危险色
 */
export type ColorType =
  | 'primary'
  | 'link'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export function getColorClass(state?: ColorType): string {
  let clz = '';
  switch (state) {
    case 'primary':
    case 'link':
    case 'info':
    case 'success':
    case 'warning':
    case 'danger':
      clz = `is-${state}`;
      break;
    default:
      break;
  }
  return clz;
}
