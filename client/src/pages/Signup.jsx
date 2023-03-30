import axios from "axios";
import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const { signup, isLoading, error } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const obj = {
      username: formData.get("username").toString(),
      password: formData.get("password").toString(),
    };
    await signup(obj);
  }

  return (
    <>
      <section
        className="login-form"
        style={{ marginTop: "10px", width: "400px" }}
      >
        <h2 className="update-title">Sign Up!</h2>
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
            Sign Up!
          </button>
        </form>
      </section>
      {error && <h5 className="notif-error wrong">{error}</h5>}
    </>
  );
};

export default Signup;
