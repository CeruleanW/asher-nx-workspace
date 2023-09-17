// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rest } from 'lodash';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const Hero = styled.section``;

const Sponsor = styled.section``;

const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
`;

const Footer = styled.footer`
  margin-top: auto;
`;

function PageTemplate({ children, ...optionals }) {
  const { header, hero, sponsor, footer, ...rest } = optionals;
  return (
    <Wrapper {...rest}>
      {header && <Header>{header}</Header>}
      <main>
        {hero && <Hero>{hero}</Hero>}
        {sponsor && <Sponsor>{sponsor}</Sponsor>}
        <Content>{children}</Content>
      </main>
      <Footer>{footer}</Footer>
    </Wrapper>
  );
}

PageTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  hero: PropTypes.node,
  sponsor: PropTypes.node,
  footer: PropTypes.node.isRequired,
  children: PropTypes.any.isRequired,
};

export default PageTemplate;
