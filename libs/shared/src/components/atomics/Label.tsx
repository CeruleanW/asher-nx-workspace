import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';

export const LabelForSelect = styled.p`
  color: ${(props) => props.theme.palette.grayscale[2]};
`;

/**
 *
 */
export function MuiLabel(props) {
  return <InputLabel {...props}/>
}
