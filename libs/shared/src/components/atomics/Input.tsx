import styled from 'styled-components';
import MuiTextField from '@mui/material/TextField';

const StyledInput = styled.input`
  /* width: 80%; */
  border-radius: .25rem;
  padding: 0.2rem;
  &:focus {
    color: #212529;
    background-color: #fff;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }
`;

const StyledBottomBorder = styled(StyledInput)`
  border-width: 0px;
  border-bottom: 1px solid ${(props) => props.theme?.palette?.grayscale[4]};
  border-radius: 0px;
  padding: 4px 0;
  min-width: 6rem;
  color: ${(props) => props.theme?.palette?.fourth};
`;

export function Input(props) {
  return <StyledInput {...props} />;
}


export function BottomBorderInput(props) {
  return <StyledBottomBorder {...props} />;
}

export const TextField = MuiTextField;
