import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './input';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Input>;

export const Static: ComponentStory<typeof Input> = () => <Input />;
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = React.useState('init value');
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log('demo::input onchange::', evt.target.value);
    setValue(evt.target.value);
  };
  return <Input value={value} onChange={onChange} {...args} />;
};
Dynamic.args = {
  iColor: 'primary',
  iSize: 'large',
  disabled: false,
  defaultValue: 'holder',
};
Dynamic.storyName = '动态示例';
