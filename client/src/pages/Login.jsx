import axios from "axios";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login, error, isLoading } = useLogin();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const obj = {
      username: formData.get("username").toString(),
      password: formData.get("password").toString(),
    };
    await login(obj);
  }

  return (
    <section
      className="login-form"
      style={{ marginTop: "5px", width: "400px" }}
    >
      <h2 className="update-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          style={{ width: "250px" }}
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          style={{ width: "250px" }}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button disabled={isLoading} className="btn">
          Login
        </button>{" "}
      </form>
      {error && <h5 className="notif-error wrong">{error}</h5>}
    </section>
  );
};

export default Login;
