import * as React from 'react';
import {DUMMY_IMAGES} from './DUMMY_IMAGES'
import classes from './PictureReveal.module.css'
import { PictureRevealOutput } from './PictureRevealOutput';

export interface IPictureRevealProps {
}

export function PictureReveal (props: IPictureRevealProps) {
  return (
    <div>
      <PictureRevealOutput />
    </div>
  );
}
