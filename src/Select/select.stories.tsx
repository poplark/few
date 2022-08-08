import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './select';
import { Optgroup } from './optgroup';
import { Option } from './option';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Select',
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  subcomponents: { Optgroup, Option },
} as ComponentMeta<typeof Select>;

export const Static: ComponentStory<typeof Select> = () => (
  <Select>
    <Option key="1" value={1} title="第一个"></Option>
    <Option key="2" value={2} title="第二个"></Option>
  </Select>
);
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = React.useState<string | number | (string | number)[]>('init value');
  const onChange = function (value: string | number | (string | number)[]) {
    console.log('8888888:::demo::select::onChange::', value);
    setValue(value);
  };
console.log('bbbbbb:::', onChange);
  return (
    <Select value={value} {...args} onChange={onChange}>
      <Option key="1" value={1} title="第一个"></Option>
      <Option key="2" value={2} title="第二个"></Option>
      <Option key="3" value={3} title="第三个"></Option>
      <Option key="4" value={4} title="第四个"></Option>
    </Select>
  );
};
Dynamic.args = {
  // color: 'default',
  iSize: 'medium',
  disabled: false,
  defaultValue: 2,
};
Dynamic.storyName = '动态示例';
