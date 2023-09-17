import StickyFooter from 'react-sticky-footer'; // Library Link: https://www.npmjs.com/package/react-sticky-footer
import { Container, Typography } from '@material-ui/core';
// import { styled } from '@mui/material/styles';
import styled from 'styled-components';

const A = styled.a`
  :visited {
    color: blueviolet;
  }
`;

/**
 *
 */
export function Footer({ ...optionals }) {
  const { url, owner, ...rest } = optionals;

  return (
    <StickyFooter
      bottomThreshold={50}
      // stickAtThreshold={0}
      normalStyles={{
        backgroundColor: '#1b2024',
        padding: '1rem',
        color: 'rgb(192 192 192)',
        font: "300 0.9rem 'Lora', serif",
      }}
      stickyStyles={{
        backgroundColor: 'rgba(255,255,255,.8)',
        padding: '1rem',
        font: "300 1rem 'Lora', serif",
      }}
    >
      <Container>
        <Typography align="center">
          {' '}
          Copyright &copy; 2020 Developed with ❤️ by
          <A href="https://github.com/CeruleanW">
            {' '}
            Asher Yang
          </A>
        </Typography>
      </Container>
    </StickyFooter>
  );
}