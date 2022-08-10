import React, { useContext, useLayoutEffect, useEffect, useRef, useCallback } from 'react';
import Classnames from 'classnames';
import { PopoverContext } from './context';

export interface PopoverContentProps {
  className?: string;
  arrow?: boolean;
}

export const PopoverContent: React.FC<
  React.PropsWithChildren<PopoverContentProps>
> = (props) => {
  const { className, arrow, children, ...others } = props;

  const ctx = useContext(PopoverContext);

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ctx.visible) return;
    if (!ref.current) return;
    if (!ref.current.parentElement) return;

    const currentElement = ref.current;
    const { width, height } = ref.current.getBoundingClientRect();
    const parentElement = ref.current.parentElement;
    const { width: pWidth, height: pHeight } = parentElement.getBoundingClientRect();

    const originTopStyle = currentElement.style.top;
    const originLeftStyle = currentElement.style.left;
    switch (ctx.placement) {
      case 'bottom':
      case 'top':
        currentElement.style.left = `${(pWidth-width)/2}px`;
        break;
      case 'left':
      case 'right':
        currentElement.style.top = `${(pHeight-height)/2}px`;
        break;
      default:
    }

    return () => {
      // 消除前面加/删的 Class 或 Style
      currentElement.style.top = originTopStyle;
      currentElement.style.left = originLeftStyle;
    }
  }, [ref.current, ctx.visible, ctx.placement]);

  const relocation = useCallback(() => {
    if (!ctx.visible) return;
    if (!ref.current) return;
    if (!ref.current.parentElement) return;

    // const currentElement = ref.current;
    const { width, height } = ref.current.getBoundingClientRect();
    const parentElement = ref.current.parentElement;
    const { top: pTop, left: pLeft, bottom: pBottom, right: pRight, width: pWidth, height: pHeight } = parentElement.getBoundingClientRect();

    const originalPlacement = ctx.placement;
    let transformedPlacement = originalPlacement;
    if (['top', 'topLeft', 'topRight'].includes(ctx.placement)) {
      if (height > pTop && height <= window.innerHeight - pBottom) {
        // 转到下面去
        // parentElement.className  = Array.from(parentElement.classList).filter((item) => item !== 'is-up').join(' ');
        // parent.delClass.push('is-up');
        switch (originalPlacement) {
          case 'top':
            transformedPlacement = 'bottom';
            break;
          case 'topLeft':
            transformedPlacement = 'bottomLeft';
            break;
          case 'topRight':
            transformedPlacement = 'bottomRight';
            break;
          default:
            break;
        }
      }
    }
    if (['bottom', 'bottomLeft', 'bottomRight'].includes(ctx.placement)) {
      if (height > window.innerHeight - pBottom && height <= pTop) {
        // 转到上面去
        // parentElement.className  = Array.from(parentElement.classList).filter((item) => item !== 'is-up').concat('is-up').join(' ');
        // parent.addClass.push('is-up');
        switch (ctx.placement) {
          case 'bottom':
            transformedPlacement = 'top';
            break;
          case 'bottomLeft':
            transformedPlacement = 'topLeft';
            break;
          case 'bottomRight':
            transformedPlacement = 'topRight';
            break;
          default:
            break;
        }
      }
    }

    if (['left', 'leftTop', 'leftBottom'].includes(ctx.placement)) {
      if (width > pLeft && width <= window.innerWidth - pRight) {
        // 转成右对齐
        // parentElement.className  = Array.from(parentElement.classList).filter((item) => item !== 'is-right').concat('is-right').join(' ');
        // parent.addClass.push('is-right');
        switch (ctx.placement) {
          case 'left':
            transformedPlacement = 'right';
            break;
          case 'leftTop':
            transformedPlacement = 'rightTop';
            break;
          case 'leftBottom':
            transformedPlacement = 'rightBottom';
            break;
          default:
            break;
        }
      }
    }

    if (['right', 'rightTop', 'rightBottom'].includes(ctx.placement)) {
      if (width > window.innerWidth - pRight && width <= pLeft) {
        // 转成左对齐
        // parentElement.className  = Array.from(parentElement.classList).filter((item) => item !== 'is-right').join(' ');
        // parent.delClass.push('is-right');
        switch (ctx.placement) {
          case 'right':
            transformedPlacement = 'left';
            break;
          case 'rightTop':
            transformedPlacement = 'leftTop';
            break;
          case 'rightBottom':
            transformedPlacement = 'leftBottom';
            break;
          default:
            break;
        }
      }
    }

    // parentElement.className = Array.from(parentElement.classList).concat(parent.addClass).join(' ');
    // parentElement.className = Array.from(parentElement.classList).filter((item) => !parent.delClass.includes(item)).join(' ');
    // todo - 按理说不用判断，但不判断时，会触发最外层 Popover 的重新渲染，为啥？？？
    // 实验证明 setState 传相同值调用第二次时，的确会触发 re-render
    // 但调用第三次时，不会触发 re-render
    if (originalPlacement !== transformedPlacement) {
      ctx.autoPlacement(transformedPlacement);
    }
  }, [ref.current, ctx.visible, ctx.placement]);

  useEffect(() => {
    relocation();
    // todo - 节流
    window.addEventListener('resize', relocation);
    return () => {
      window.removeEventListener('resize', relocation);
    }
  }, [relocation]);

  const clz = Classnames('dropdown-content', className);

  console.log('PopoverContent::render::');
  return (
    <div className="dropdown-menu" ref={ref}>
      <div className={clz} {...others}>
        { arrow
          ? (
            <div className="popover-arrow"></div>
          )
          : null
        }
        <div className="popover-content">
          {children}
        </div>
      </div>
    </div>
  );
};

PopoverContent.displayName = 'PopoverContent';
PopoverContent.defaultProps = {
  arrow: false,
}
