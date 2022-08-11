import React from 'react';
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
  return (
    <Tabs {...args}>
      <TabPane key="1" tab="第一个">
        第一个 Tab 的内容
      </TabPane>
      <TabPane key="2" disabled tab="第二个">
        第二个 Tab 的内容
      </TabPane>
      <TabPane key="3" tab="第三个">
        第三个 Tab 的内容
      </TabPane>
      <TabPane key="4" tab={<div><Icon type="image"/><p>第四个</p></div>}>
        第四个 Tab 的内容
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
