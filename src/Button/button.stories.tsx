import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Button>;

export const Static: ComponentStory<typeof Button> = () => <Button>Button</Button>;
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Button>  = (args) => <Button {...args}>Button</Button>;
Dynamic .args = {
  kind: 'primary',
  size: 'lg',
  disabled: false,
  href: '',
};
Dynamic.storyName = '动态示例';
