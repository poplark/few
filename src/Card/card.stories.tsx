import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from './card';
import { Icon } from '../Icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Card>;

export const Static: ComponentStory<typeof Card> = () => (
  <Card title='外部卡片'>
    <Card title='内部卡片' type='inner'>
      卡片内容
    </Card>
  </Card>
);
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Card> = (args) => {
  return <Card {...args}>Card</Card>
};
Dynamic.args = {
  title: '卡片',
  extra: <Icon type='x'></Icon>,
  actions: [
    'left',
    'middle',
    'right'
  ],
};
Dynamic.storyName = '动态示例';
