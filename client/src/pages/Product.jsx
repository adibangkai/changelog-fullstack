import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import ErrorBoundary from "./ErrorBoundary";
import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";

const Product = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const results = useQuery(["project", user, id], fetchUpdate);
  const projects = results?.data?.data ?? [];
  console.log(projects);

  if (results.isLoading) {
    return (
      <section className="project">
        <h4 style={{ textAlign: "center " }}>Loading..</h4>
      </section>
    );
  }
  if (results.isError) {
    return (
      <section className="project">
        <h4 style={{ textAlign: "center " }}>
          Sorry there's something wrong <Link to={"/"}>click here</Link> to go
          back to home.
        </h4>
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section className="project">
        <Link
          to={`/project/form/${id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <button className="add">Add Update</button>{" "}
        </Link>
        <h4 style={{ textAlign: "center", paddingTop: "2em" }}>
          this project does not have any updates yet
        </h4>
      </section>
    );
  }
  return (
    <section className="main">
      <Link
        to={`/project/form/${id}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <button className="add">Add Update</button>{" "}
      </Link>

      <div className="update-list">
        {projects.map((p) => (
          <div className="update" key={p.id}>
            <div className="status-bar">
              <h3 className={`status ${p.status}`}>{p.status}</h3>
              <h3 className="update-date">{p.createdAt.split("T")[0]}</h3>
              <span className="update-ver">{p.version}</span>
            </div>

            <div className="update-content">
              <span className="dot wrong"></span>
              <h2 className="update-title">{p.title}</h2>
              <Markdown>{p.body}</Markdown>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const fetchUpdate = async ({ queryKey }) => {
  const user = queryKey[1];
  const id = queryKey[2];

  const res = await fetch(`http://localhost:3001/api/update/${id}`, {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`cannot get product data`);
  }
  return res.json();
};

export default function ProductErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Product {...props} />
    </ErrorBoundary>
  );
}
