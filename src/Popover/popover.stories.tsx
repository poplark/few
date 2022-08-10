import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../Button';
import { Popover } from './popover';
import { PopoverTrigger } from './popover-trigger';
import { PopoverContent } from './popover-content';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Popover',
  component: Popover,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  subcomponents: { PopoverTrigger, PopoverContent },
} as ComponentMeta<typeof Popover>;

export const Static: ComponentStory<typeof Popover> = () => {
  return (
    <Popover visible={true}>
      <PopoverTrigger>
        <Button>显示下拉框</Button>
      </PopoverTrigger>
      <PopoverContent>
        popover
      </PopoverContent>
    </Popover>
  );
};
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Popover> = (args) => {
  const onVisibleChange = (visible: boolean) => {
    console.log('popover visible:: ', visible);
  }
  return (
    <Popover {...args} onVisibleChange={onVisibleChange}>
      <PopoverTrigger>
        <Button style={{padding: '40px'}}>显示下拉框</Button>
      </PopoverTrigger>
      <PopoverContent arrow>
        <div style={{padding: '40px'}}>
          {args.placement}
        </div>
      </PopoverContent>
    </Popover>
  );
};
Dynamic.args = {
  visible: false,
  trigger: 'click',
  placement: 'bottom',
  style: {top: '200px', left: '200px'},
};
Dynamic.storyName = '动态示例';
