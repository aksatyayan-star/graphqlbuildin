//using bootstrap making this spinner comp so that we don't see Loading written on screen when in loading state
//instead we will see circular loading icon in the ui, will be importing this comp in Clients.jsx

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center">
        <div className="spinner-border" role='status'>
            <span className="sr-only"></span>
        </div>
    </div>
  );
}
