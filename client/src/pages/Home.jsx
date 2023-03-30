import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProductData } from "../hooks/useProduct";
import ErrorBoundary from "./ErrorBoundary";
const Home = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const queryClient = useQueryClient();
  const results = useProductData(user);

  const postProduct = async () => {
    const response = await fetch("http://localhost:3001/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({ name }),
    });
    return response.json();
  };

  const addProductMutation = useMutation(postProduct, {
    onMutate: () => {
      console.log("mutate happen");
    },
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries(["products", user]);
    },
  });

  const addHandler = (e) => {
    e.preventDefault();
    addProductMutation.mutate({ user: user, name: name });
    setName("");
    setDisplayForm(false);
  };
  const products = results?.data?.data ?? [];

  if (results.isLoading) {
    return (
      <section className="project">
        <h1 style={{ textAlign: "center" }}>loading..</h1>
      </section>
    );
  }
  if (results.isError) {
    return <h1 style={{ textAlign: "center" }}>FAIL..</h1>;
  }

  return (
    <>
      <section className="project">
        <button className="add" onClick={() => setDisplayForm(!displayForm)}>
          add product
        </button>
        {displayForm && (
          <form onSubmit={addHandler}>
            <div className="project-form">
              <input
                style={{ width: "40%" }}
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Project Name"
                name="name"
                value={name}
              />
              <button className="btn">submit</button>
            </div>
          </form>
        )}
        <h2 className="page-title">{user.user}`s Project List</h2>
        <div className="project-content">
          {!products.length ? (
            <h1>this user does not have project yet</h1>
          ) : (
            products.map((p) => (
              <div className="card" key={p.id}>
                <Link
                  to={`/project/${p.id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <h2 className="card-title">{p.name}</h2>
                </Link>
                <p className="card-body">
                  Chronos can be used as a Road map, Cv/ Resume’s timeline,
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quos, voluptatibus explicabo. Minima deleniti libero enim sit
                  laudantium fuga ullam accusamus hic! Tempore odit asperiores
                  unde inventore nam et ipsa aut.
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default function HomeErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Home {...props} />
    </ErrorBoundary>
  );
}
