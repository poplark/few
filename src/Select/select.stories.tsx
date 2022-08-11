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
  const onChange = function (value?: string | number | (string | number)[]) {
    console.log('demo::select::onChange::', value);
  };
  return (
    <Select {...args} onChange={onChange} style={{margin: '300px 0'}}>
      <Option key="1" value='1' title="第一个"></Option>
      <Option key="2" value='2' title="第二个"></Option>
      <Option key="3" value='3' title="第三个"></Option>
      <Option key="4" value='4' title="第四个"></Option>
      <Option key="5" value='5' title="第五个"></Option>
      <Option key="6" value='6' title="第六个"></Option>
      <Option key="7" value='7' title="第七个"></Option>
      <Option key="8" value='8' title="第八个"></Option>
      <Option key="9" value='9' title="第九个"></Option>
      <Option key="10" value='10' title="第十个"></Option>
      <Option key="11" value='11' title="第十一个"></Option>
    </Select>
  );
};
Dynamic.args = {
  // color: 'default',
  iSize: 'medium',
  disabled: false,
  defaultValue: '2',
};
Dynamic.storyName = '动态示例';
