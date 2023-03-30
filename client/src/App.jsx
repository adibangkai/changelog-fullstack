import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
import Header from "./pages/components/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import Product from "./pages/Product";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  const { user } = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Routes>
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/project/:id"
              element={user ? <Product /> : <Navigate to="/login" />}
            />
            <Route
              path="/project/form/:id"
              element={user ? <FormPage /> : <Navigate to="/login" />}
            />
          </Routes>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
