import React, { Ref, PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledBtn = styled.span<{ reversed; active; }> `
  cursor: pointer;
      color: ${props => props.reversed
    ? props.active
      ? 'white'
      : '#aaa'
    : props.active
      ? 'black'
      : '#ccc'};`;
export interface BaseProps {
  className: string;
  [key: string]: unknown;
}
export type OrNull<T> = T | null;

export const Button = React.forwardRef(
  (
    {
      className, active, reversed, ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <StyledBtn
      {...props}
      ref={ref}
      className={className}
      reversed={reversed}
      active={active} />
  )
);
