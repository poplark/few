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
  subcomponents: { Optgroup, Option }
} as ComponentMeta<typeof Select>;

export const Static: ComponentStory<typeof Select> = () => (
  <Select>
    <Option>第一个</Option>
    <Option>第二个</Option>
  </Select>
);
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = React.useState('init value');
  const onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('demo::select::onChange::', evt.target.value);
    setValue(evt.target.value);
  }
  return (
    <Select value={value} onChange={onChange} {...args}>
      <Optgroup label="第一组">
        <Option>第一个</Option>
        <Option>第二个</Option>
      </Optgroup>
      <Optgroup label="第二组">
        <Option>第一个</Option>
        <Option>第二个</Option>
      </Optgroup>
    </Select>
  )
};
Dynamic.args = {
  color: 'primary',
  iSize: 'large',
  disabled: false,
  defaultValue: 'holder',
};
Dynamic.storyName = '动态示例';
