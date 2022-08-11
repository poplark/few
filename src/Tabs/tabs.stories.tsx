import React, { useMemo } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs } from './tabs';
import { TabPane } from './tab-pane';
import { Icon } from '../Icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Tabs',
  component: Tabs,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  subcomponents: { TabPane },
} as ComponentMeta<typeof Tabs>;

export const Static: ComponentStory<typeof Tabs> = () => (
  <Tabs>
    <TabPane key="1" tab="第一个">
      第一个 Tab 的内容
    </TabPane>
    <TabPane key="2" tab="第二个">
      第二个 Tab 的内容
    </TabPane>
    <TabPane key="3" tab="第三个">
      第三个 Tab 的内容
    </TabPane>
  </Tabs>
);
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Tabs> = (args) => {
  const p = React.useMemo(() => {
    return (
      <TabPane key="5" tab="第五个">
        第五个 Tab 的内容
      </TabPane>
    )
  }, []);
  const onChange = (key: string) => {
    console.log('tab::changed::', key);
  }
  const onTabClick = (key: string, evt: React.MouseEvent) => {
    console.log('tab::clicked::', key);
  }
  return (
    <Tabs {...args} onChange={onChange} onTabClick={onTabClick}>
      <TabPane key="1" tab="第一个">
        第一个 Tab 的内容
      </TabPane>
      <TabPane key="2" disabled tab="第二个">
        第二个 Tab 的内容
      </TabPane>
      <TabPane key="3" tab={<div><Icon type="image"/><span>第三个</span></div>}>
        第三个 Tab 的内容
      </TabPane>
      <TabPane key="4" tab={<div><Icon type="desktop"/><span>第四个</span></div>}>
        第四个 Tab 的内容
      </TabPane>
      {p}
      <TabPane key="6" tab="第六个">
        第六个 Tab 的内容
      </TabPane>
    </Tabs>
  );
};
Dynamic.args = {
  // color: 'default',
  size: 'normal',
  defaultActiveKey: '3',
};
Dynamic.storyName = '动态示例';
