import React, { useContext, useLayoutEffect, useEffect, useRef, useCallback } from 'react';
import Classnames from 'classnames';
import { PopoverContext } from './context';

export interface PopoverContentProps {
  className?: string;
}

export const PopoverContent: React.FC<
  React.PropsWithChildren<PopoverContentProps>
> = (props) => {
  const { className, children, ...others } = props;

  const ctx = useContext(PopoverContext);

  const ref = useRef<HTMLDivElement>(null);

  const relocation = useCallback(() => {
    if (!ctx.visible) return;
    if (!ref.current) return;
    if (!ref.current.parentElement) return;

    // const currentElement = ref.current;
    const { width, height } = ref.current.getBoundingClientRect();
    const parentElement = ref.current.parentElement;
    const { top: pTop, left: pLeft, bottom: pBottom, right: pRight, width: pWidth, height: pHeight } = parentElement.getBoundingClientRect();

    // 计算上下空间是否够用
    const bottomOverflow = pBottom + height > window.innerHeight;
    const topOverflow = pTop < height;

    const parent = {
      addClass: [] as string[],
      delClass: [] as string[],
    };
    if (['bottom', 'bottomLeft', 'bottomRight'].includes(ctx.placement)) {
      if (bottomOverflow && pTop >= height) {
        // 转到上面去
        // parentElement.className  = Array.from(parentElement.classList).filter((item) => item !== 'is-up').concat('is-up').join(' ');
        parent.addClass.push('is-up');
      }
    }
    if (['top', 'topLeft', 'topRight'].includes(ctx.placement)) {
      if (topOverflow && pBottom + height <= window.innerHeight) {
        // 转到下面去
        // parentElement.className  = Array.from(parentElement.classList).filter((item) => item !== 'is-up').join(' ');
        parent.delClass.push('is-up');
      }
    }

    // 计算左右空间是否够用
    const leftOverflow = pRight - width < 0;
    const rightOverflow = pLeft + width > window.innerWidth;

    if (['right', 'bottomRight', 'topRight'].includes(ctx.placement)) {
      if (leftOverflow && (window.innerWidth - pLeft) >= width) {
        // 转成左对齐
        // parentElement.className  = Array.from(parentElement.classList).filter((item) => item !== 'is-right').join(' ');
        parent.delClass.push('is-right');
      }
    }

    if (['left', 'bottomLeft', 'topLeft'].includes(ctx.placement)) {
      if (rightOverflow && pRight >= width) {
        // 转成右对齐
        // parentElement.className  = Array.from(parentElement.classList).filter((item) => item !== 'is-right').concat('is-right').join(' ');
        parent.addClass.push('is-right');
      }
    }

    parentElement.className = Array.from(parentElement.classList).concat(parent.addClass).join(' ');
    parentElement.className = Array.from(parentElement.classList).filter((item) => !parent.delClass.includes(item)).join(' ');
    return () => {
      // 消除前面加/删的 Class 或 Style
      parentElement.className = Array.from(parentElement.classList).concat(parent.delClass).join(' ');
      parentElement.className = Array.from(parentElement.classList).filter((item) => !parent.addClass.includes(item)).join(' ');
    }
  }, [ref.current, ctx.visible, ctx.placement]);

  useLayoutEffect(() => {
    return relocation();
  }, [relocation]);

  useEffect(() => {
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
        {children}
      </div>
    </div>
  );
};

PopoverContent.displayName = 'PopoverContent';
