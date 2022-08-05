import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon } from './icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Icon',
  component: Icon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Icon>;

export const Static: ComponentStory<typeof Icon> = () => {
  return (
    <Icon type="home"></Icon>
  );
};
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Icon> = (args) => {
  return (
    <Icon {...args}></Icon>
  );
};
Dynamic.args = {
  type: 'spinner',
  size: 'large',
  spin: true,
};
Dynamic.storyName = '动态示例';
