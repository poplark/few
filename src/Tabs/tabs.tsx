import React, { useState, useEffect } from 'react';
import Classnames from 'classnames';
import { SizeType, getSizeClass } from '../config/size-type';
import { TabPane, TabPaneProps } from './tab-pane';

export interface TabsProps {
  defaultActiveKey?: string;
  activeKey?: string;
  alignment?: 'left' | 'centered' | 'right';
  size?: SizeType;
  kind?: 'boxed' | 'toggle' | 'toggle-rounded' | 'fullwidth';
  className?: string;
  style?: React.CSSProperties;
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';
  onChange?: (activeKey: string) => void;
  onTabClick?: (key: string, evt: React.MouseEvent) => void;
}

export const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = (props) => {
  const { defaultActiveKey, activeKey, alignment, size, kind, className, style, tabPosition, onChange, onTabClick, children, ...others } = props;

  const [activeTab, setActiveTab] = useState(activeKey || defaultActiveKey);

  useEffect(() => {
    activeKey && setActiveTab(activeKey);
  }, [activeKey]);

  useEffect(() => {
    activeTab && onChange && onChange(activeTab);
  }, [activeTab]);

  const renderTabs = () => {
    let _active = activeTab;
    function onClick(key: string, evt: React.MouseEvent) {
      onTabClick && onTabClick(key, evt);
      setActiveTab(key);
    }
    const res = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === TabPane) {
          const key = child.key as string;
          const { tab, disabled, active } =  child.props as TabPaneProps;
          if (!activeTab) {
            if (!_active && !disabled) {
              _active = key;
            }
            if (active && !disabled) {
              _active = key;
            }
            return;
          }
          const lClz = Classnames({'is-active': _active === key});
          const clz = Classnames({'disabled': !!disabled});
          return (
            <li key={child.key} className={lClz}>
              {
                !!disabled
                  ? <a  className={clz}>{tab}</a>
                  : <a onClick={onClick.bind(null, key)} className={clz}>{tab}</a>
              }
            </li>
          );
        }
      }
      return null;
    });
    if (_active && _active !== activeTab) {
      setActiveTab(_active);
    }
    return res;
  };

  const renderPanes = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === TabPane) {
        if (child.key === activeTab) {
          return React.cloneElement(child, Object.assign({}, child.props, {active: true}));
        }
        return child;
      }
    });
  };

  const aClz = alignment && ['centered', 'right'].includes(alignment) ? `is-${alignment}` : null;
  const kClz = kind && ['boxed', 'toggle', 'toggle-rounded', 'fullwidth'].includes(kind) ? `is-${kind}` : null;
  const pClz = tabPosition && ['top', 'bottom', 'left', 'right'].includes(tabPosition) ? `position-${tabPosition}` : null;
  const clz = Classnames('tabs', aClz, kClz, getSizeClass(size), pClz, className);

  console.log('Tabs::render::');
  return (
    <div className={clz} {...others}>
      <ul>
        { renderTabs() }
      </ul>
      <div className="tab-panes">
        { renderPanes() }
      </div>
    </div>
  )
}
Tabs.displayName = 'Tabs';
Tabs.defaultProps = {
  alignment: 'left',
  size: 'normal',
  tabPosition: 'top',
};
