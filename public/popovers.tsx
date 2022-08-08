import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/Popover';
import { Button } from '@/Button';

export function Popovers(): JSX.Element {

  return (
    <div style={{position: 'relative', display: 'flex', flexDirection: 'row'}}>
      <div>
        <Popover placement='bottomRight'>
          <PopoverTrigger>
            <Button>BottomRight</Button>
          </PopoverTrigger>
          <PopoverContent>
            <h1>Bottom</h1>
            <h2>Right</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Popover placement='topRight'>
          <PopoverTrigger>
            <Button>TopRight</Button>
          </PopoverTrigger>
          <PopoverContent>
            <h1>Top</h1>
            <h2>Right</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Popover placement='bottomLeft'>
          <PopoverTrigger>
            <Button>BottomLeft</Button>
          </PopoverTrigger>
          <PopoverContent>
            <h1>Bottom</h1>
            <h2>Left</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Popover placement='topLeft'>
          <PopoverTrigger>
            <Button>TopLeft</Button>
          </PopoverTrigger>
          <PopoverContent>
            <h1>Top</h1>
            <h2>Left</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
