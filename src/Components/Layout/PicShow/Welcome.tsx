import "../PicShow/Welcome.css"

function Welcome(): JSX.Element { 
  return (
    <div className="Welcome">
        <h2 className="grey">Welcome To</h2>
        <h1 className="fs">Coupon System</h1>
        {/* <h1 className="fs">System</h1> */}
       <h2 className="grey">You can Login...</h2>
    </div>
  );
}

export default Welcome;
