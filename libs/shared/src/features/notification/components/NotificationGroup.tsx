import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


export function NotificationGroup() {

  return (
    <div>
      <ToastContainer position={'bottom-right'} autoClose={5000}/>
    </div>
  )
}
