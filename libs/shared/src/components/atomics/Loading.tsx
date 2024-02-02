import CircularProgress from '@mui/material/CircularProgress';
import MuiLinearProgress from '@mui/material/LinearProgress';

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

export function LinearProgress(props) {
  return <MuiLinearProgress {...props} />
}
