import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <section className="header">
        <h1 className="title">{user ? `${user.user}'s` : "Project"}</h1>
        <h1 className="logo">Changelog</h1>
        {user ? (
          <>
            <div className="tab-bar">
              <Link className="tab" to="/">
                Recents Updates
              </Link>
              <Link className="tab" to="/">
                Project List
              </Link>
            </div>
            <div className="top-nav">
              <button
                className="logout-btn"
                style={{ marginTop: "10px" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="top-nav">
            <Link to="/" style={{ textDecoration: "none" }}>
              <button className="logout-btn" style={{ marginTop: "10px" }}>
                Login
              </button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button className="logout-btn" style={{ marginTop: "10px" }}>
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Header;
