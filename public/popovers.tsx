import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/Popover';
import { Button } from '@/Button';

export function Popovers(): JSX.Element {

  return (
    <div style={{position: 'relative'}}>
      <div style={{position: 'absolute', left: '300px'}}>
        <Popover placement='topLeft'>
          <PopoverTrigger>
            <Button>上左</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Top</h1>
            <h2>Left</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '380px'}}>
        <Popover placement='top'>
          <PopoverTrigger>
            <Button>上中</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Top</h1>
            <h2>Top</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '460px'}}>
        <Popover placement='topRight'>
          <PopoverTrigger>
            <Button>上右</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Top</h1>
            <h2>Right</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '540px', top: '60px'}}>
        <Popover placement='rightTop'>
          <PopoverTrigger>
            <Button>右上</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Right</h1>
            <h2>Top</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '540px', top: '110px'}}>
        <Popover placement='right'>
          <PopoverTrigger>
            <Button>右中</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Right</h1>
            <h2>Right</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '540px', top: '160px'}}>
        <Popover placement='rightBottom'>
          <PopoverTrigger>
            <Button>右下</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Right</h1>
            <h2>Bottom</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '460px', top: '210px'}}>
        <Popover placement='bottomRight'>
          <PopoverTrigger>
            <Button>下右</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Bottom</h1>
            <h2>Right</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '380px', top: '210px'}}>
        <Popover placement='bottom'>
          <PopoverTrigger>
            <Button>下中</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Bottom</h1>
            <h2>Bottom</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '300px', top: '210px'}}>
        <Popover placement='bottomLeft'>
          <PopoverTrigger>
            <Button>下左</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Bottom</h1>
            <h2>Left</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '220px', top: '160px'}}>
        <Popover placement='leftBottom'>
          <PopoverTrigger>
            <Button>左下</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Left</h1>
            <h2>Bottom</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '220px', top: '110px'}}>
        <Popover placement='left'>
          <PopoverTrigger>
            <Button>左中</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Left</h1>
            <h2>Left</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
      <div style={{position: 'absolute', left: '220px', top: '60px'}}>
        <Popover placement='leftTop'>
          <PopoverTrigger>
            <Button>左上</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <h1>Left</h1>
            <h2>Top</h2>
            <p>body bla... bla... bla.......</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
