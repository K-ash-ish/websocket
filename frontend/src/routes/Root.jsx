import { Link } from "react-router-dom";

function Root() {
  return (
    <div>
      <ul>
        <li>
          <Link to={`chatroom/1`}>User 1</Link>
        </li>
        <li>
          <Link to={`chatroom/2`}>User 2</Link>
        </li>
        <li>
          <Link to={`chatroom/3`}>User 3</Link>
        </li>
      </ul>
    </div>
  );
}

export default Root;
