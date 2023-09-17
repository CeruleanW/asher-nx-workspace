import { Typography } from '@material-ui/core';

export function Heading(props) {
  return (
    <div className='mt-2 mb-4'>
      <Typography variant={'h2'}>{props.children}</Typography>
    </div>
  );
}

export default Heading;


export function H1(props) {
  return <Typography variant={'h1'}>{props.children}</Typography>;
}
