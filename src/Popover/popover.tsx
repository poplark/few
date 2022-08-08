import React, { useEffect, useRef } from 'react';
import Classnames from 'classnames';
import { ColorType, getColorClass } from '../config/color-type';
import { PopoverTrigger, PopoverTriggerProps } from './popover-trigger';
import { PopoverContent, PopoverContentProps } from './popover-content';
import { PopoverContext, usePopoverContext, Placement } from './context';

export interface IPopoverProps {
  color?: ColorType;
  trigger?: 'hover' | 'click' | 'focus';
  visible?: boolean;
  placement?: Placement;
  onVisibleChange?: (visible: boolean) => void;
  className?: string;
}


export type PopoverProps = React.HTMLAttributes<HTMLElement> & IPopoverProps;

export const Popover: React.FC<PopoverProps> = (props) => {
  const { color, trigger, visible = false, placement = 'bottom', onVisibleChange, className, children } = props;

  const ctx = usePopoverContext(placement, !!visible);

  const open = (evt: React.MouseEvent): void => {
    if (ctx.visible) return;
    if (
      evt.type === trigger ||
      (evt.type === 'mouseenter' && trigger === 'hover')
    ) {
      ctx.triggerVisible(true);
    }
  };
  const close = (evt: React.MouseEvent): void => {
    if (!ctx.visible) return;
    if (evt.type === 'mouseleave' && trigger === 'hover') {
      ctx.triggerVisible(false);
    }
  };

  const triggerContainerRef = useRef<HTMLDivElement>();
  // todo - 有必要用 memo 吗？？没必要，因为不起作用。那么怎么优化才能让 Content 不做多余的渲染呢？？
  // const { popoverTrigger } = React.useMemo(() => {
  let popoverTrigger: React.ReactElement<PopoverTriggerProps> | undefined;
  let popoverContent: React.ReactElement<PopoverContentProps> | undefined;
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      console.warn(
        'Only PopoverTrigger and PopoverContent can be includes, unsupported node: ',
        child,
      );
    } else if (child.type === PopoverTrigger) {
      const { props: triggerProps } =
        child as React.ReactElement<PopoverTriggerProps>;
      const originalOnClick = triggerProps.onClick;
      const _onClick = (evt: React.MouseEvent) => {
        originalOnClick && originalOnClick(evt);
        open(evt);
      };
      // 为 trigger 绑定 onClick 事件，以此来点击显示下拉框
      popoverTrigger = React.cloneElement<PopoverTriggerProps>(
        child,
        Object.assign({}, triggerProps, {
          ref: triggerContainerRef,
          onClick: _onClick,
        }),
      );
    } else if (child.type === PopoverContent) {
      popoverContent = child as React.ReactElement<PopoverContentProps>;
    } else {
      console.warn(
        'Only PopoverTrigger and PopoverContent can be includes, unsupported element: ',
        child,
      );
    }
  });
  //   return { popoverTrigger };
  // }, [children, open]);

  useEffect(() => {
    const clickHandler = (evt: MouseEvent): void => {
      // ref 引用 trigger 中的容器元素，若不包含事件触发节点，则关闭下拉框
      if (
        !(
          triggerContainerRef.current &&
          triggerContainerRef.current.contains(evt.target as Node)
        )
      ) {
        ctx.visible && ctx.triggerVisible(false);
      }
    };
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [triggerContainerRef, ctx.visible]);

  const clz = Classnames('dropdown', { 'is-active': ctx.visible });

  console.log('Popover::render::');

  return (
    <PopoverContext.Provider value={ctx}>
      <div className={clz} onMouseEnter={open} onMouseLeave={close}>
        {popoverTrigger}
        {popoverContent}
      </div>
    </PopoverContext.Provider>
  );
};

Popover.displayName = 'Popover';
Popover.defaultProps = {
  trigger: 'hover',
  visible: false,
  placement: 'top',
  onVisibleChange: () => {},
}
