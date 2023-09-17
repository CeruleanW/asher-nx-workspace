//@ts-nocheck
import { Text, Container } from '@nextui-org/react';
import Chip from '@mui/material/Chip';
import styled from 'styled-components';

// const StyledChip = styled(Chip)`
//   &[style] {
//     margin-top: 8px !important;
//   }
// `;

export default function SkillItem({text, ...optionals}) {
  const {color = '$gray900', bgColor='$gray300'} = optionals;
  return (
    <Container
      css={{
        width: 'auto',
        height: 'auto',
        margin: '$2',
        backgroundColor: bgColor,
        color: color,
        fontWeights: '$black',
        padding: '$3',
        borderRadius: '$sm'
      }}
    >
      <Text span size='0.85rem' weight='medium'>
        {text}
      </Text>
    </Container>
  );
}

export function SkillItem2({text, ...optionals}) {
  return (<Chip label={text} size='small' className={'mb-2'} />);
}
