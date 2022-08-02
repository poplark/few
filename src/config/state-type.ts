/**
 * hovered - 悬停中
 * focused - 聚焦中
 * active - 活动中
 * loading - 加载中
 */
export type StateType = 'hovered' | 'focused' | 'active' | 'loading';

export function getStateClass(state?: StateType): string {
  let clz = '';
  switch (state) {
    case 'hovered':
    case 'focused':
    case 'active':
    case 'loading':
      clz = `is-${state}`;
      break;
    default:
      break;
  }
  return clz;
}
