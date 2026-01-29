
function Box({ children, id }) {
  return (
    <div className="col-sm-12 box-base w-100 overflow-hidden text-break" id={id}>
      {children}
    </div>
  );
}

export default Box;