// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

export function TabPanel(props) {
  const { children, value, index, className, ...other } = props;

  if (value !== index) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={`flex flex-row w-full pt-8 ${className || ''}`}
      {...other}
    >
      {children}
    </div>
  );
}
