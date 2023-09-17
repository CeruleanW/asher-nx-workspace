import React, { Ref, PropsWithChildren } from 'react'
import styled from 'styled-components';
import { BaseProps, OrNull } from './Button';

const StyledMenu = styled.div`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
`;
export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <StyledMenu
      {...props}
      ref={ref}
      className={`${className}`}
    />
  )
)


const StyledToolbar = styled(Menu)`
  border-bottom: 2px solid #eee;
`;

export const ToolbarContainer = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <StyledToolbar
      {...props}
      ref={ref}
      className={`relative p-3 max-w-full ${className}`}
    />
  )
)

