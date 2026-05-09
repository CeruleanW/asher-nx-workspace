import React from 'react';
import type { ReactNode } from 'react';
import { Typography2 } from '@root/shared/components/atomics';

interface DescriptionProps {
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  text?: string;
  children?: ReactNode;
}

export default function Description({ align, text, children }: DescriptionProps) {
  return (
    <Typography2 color="textSecondary" align={align} paragraph>
      {text}
      {children}
    </Typography2>
  );
}
