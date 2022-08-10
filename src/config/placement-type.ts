/**
 * top - 上
 * topLeft - 先上后左
 * topRight - 先上后右
 * success - 成功色
 * warning - 警告色
 * danger - 危险色
 */
export type Placement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

export function getPlacementClass(placement?: Placement): string {
 let clz = 'is-bottom-left';
 switch (placement) {
   case 'top':
      clz = `is-top`;
      break;
   case 'topLeft':
      clz = `is-top-left`;
      break;
   case 'topRight':
      clz = `is-top-right`;
      break;
   case 'bottom':
      clz = `is-bottom`;
      break;
   case 'bottomLeft':
      clz = `is-bottom-left`;
      break;
   case 'bottomRight':
      clz = `is-bottom-right`;
      break;
   case 'left':
      clz = `is-left`;
      break;
   case 'leftTop':
      clz = `is-left-top`;
      break;
   case 'leftBottom':
      clz = `is-left-bottom`;
      break;
   case 'right':
      clz = `is-right`;
      break;
   case 'rightTop':
      clz = `is-right-top`;
      break;
   case 'rightBottom':
      clz = `is-right-bottom`;
      break;
   default:
     break;
 }
 return clz;
}
