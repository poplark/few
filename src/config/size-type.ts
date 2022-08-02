/**
 * large - 较大
 * medium - 中等
 * normal - 常规
 * small - 较小
 */
export type SizeType = 'large' | 'medium' | 'normal' | 'small';

export function getSizeClass(state?: SizeType): string {
  let clz = '';
  switch (state) {
    case 'large':
    case 'medium':
    case 'normal':
    case 'small':
      clz = `is-${state}`;
      break;
    default:
      break;
  }
  return clz;
}
