import { Tab, Tabs } from '@root/shared/components/atomics';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// MUI v5 ExtendButtonBase is not assignable to styled-components' type; cast to any per migration spec any-policy
// font-family comes from the theme's MuiTab styleOverrides (Theme.tsx)
const StyledTab = styled(Tab as any)`
  width: 9rem;
`;

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

interface NavTabsProps {
  routes: string[];
  value: string;
  labels: string[];
}

export default function NavTabs({ routes, value, labels }: NavTabsProps) {
  const allTabs = routes;

  const renderTabs = allTabs.map((route, index) => (
    <StyledTab
      label={labels[index]}
      value={route}
      component={Link}
      to={route}
      key={route}
      {...a11yProps(index)}
    />
  ));

  return (
    <Tabs value={value} centered textColor="inherit" aria-label="navigation tabs">
      {renderTabs}
    </Tabs>
  );
}
