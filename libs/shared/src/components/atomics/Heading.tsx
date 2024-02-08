import { Typography2 } from '../atomics/Typography';

export function Heading(props) {
  return (
    <div className='mt-2 mb-4'>
      <Typography2 variant={'h2'}>{props.children}</Typography2>
    </div>
  );
}

export default Heading;


export function H1(props) {
  return <Typography2 variant={'h1'}>{props.children}</Typography2>;
}
