import { forwardRef } from 'react';

function MyImage(props, ref) {
  return <img {...props} ref={ref} />;
}

export default forwardRef(MyImage);
