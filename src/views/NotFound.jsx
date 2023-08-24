import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      navigate("/");
    }
  }, [countdown, navigate]);

return (
  <div className="container-fluid m-auto">
    <div className="d-flex flex-column align-items-center justify-content-center my-3">
      <img src="https://media.tenor.com/ZQvpE8_p-hMAAAAC/pokemon-confused.gif" alt="Confused pokemon" className="rounded" />
      <h1>Not Found!</h1>
      {countdown > 1 ? (
        <p>Redirecting to the home page in {countdown-1} seconds...</p>
      ) : (
        <p>Redirecting to the home page...</p>
      )}
      {!countdown && <Link to="/">
        <button className="btn" title="Take me back!" style={{backgroundColor: "#ff0000", color: "#ffffff"}}>Back to home page</button>
      </Link>}
    </div>
  </div>
)
}

export default NotFound;
