
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <h1>
          <Link to="/">Vehicle Management System</Link>
        </h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Vehicle</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
