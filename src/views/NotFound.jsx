import { Link } from 'react-router-dom'

function List() {
return (
  <div className="container-fluid m-auto">
    <div className="d-flex flex-column align-items-center justify-content-center my-3">
      <img src="https://media.tenor.com/ZQvpE8_p-hMAAAAC/pokemon-confused.gif" alt="Confused pokemon" className="rounded" />
      <h1>Not Found!</h1>
      <Link to="/">
        <button className="btn" title="Take me back!" style={{backgroundColor: "#ff0000", color: "#ffffff"}}>Back to the list</button>
      </Link>
    </div>
  </div>
)
}

export default List
