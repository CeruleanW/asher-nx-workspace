import CircularProgress from '@mui/material/CircularProgress';

/**
 *
 */
export function Loader(props) {
  return (
    <CircularProgress {...props}/>
  );
}


export function CenteredLoader(props) {

  return (
    <div className={'flex flex-col flex-grow justify-center items-center w-full'} {...props}>
      <Loader />
    </div>
  );
}
