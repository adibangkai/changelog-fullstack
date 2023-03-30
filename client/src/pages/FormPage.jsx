import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RichText } from "./components/RichText";
const FormPage = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const postUpdate = async (updateData) => {
    const response = await fetch("http://localhost:3001/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(updateData),
    });
    return response.json();
  };

  const { mutate, isLoading, isError } = useMutation(postUpdate, {
    onMutate: () => {
      console.log("mutate happen");
    },
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries(["project", user, id]);
    },
  });

  // const addHandler = (e) => {
  //   e.preventDefault();
  //   addProductMutation.mutate({ user: user, name: name });
  //   setName("");
  //   setDisplayForm(false);
  // };

  const onSubmit = (data) => {
    const updateData = {
      ...data,
      productId: id,
    };
    mutate(updateData);
    console.log(updateData);
    navigate(`/project/${id}`);
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isError) {
    return <h1>error!</h1>;
  }
  return (
    <section className="project">
      <h2 className="page-title">Form</h2>
      <div className="form">
        <label htmlFor="title">Update Name</label>
        <input
          type="text"
          id="title"
          placeholder="input your project update"
          {...register("title", {
            required: "Please enter your update title.",
          })}
        />
        <label htmlFor="status">Status</label>
        <select name="status" id="status" {...register("status")}>
          <option value="IN_PROGRESS" style={{ color: "#d97e37" }}>
            IN_PROGRESS
          </option>
          <option value="SHIPPED" className="pending">
            SHIPPED
          </option>
          <option value="DEPRECATED" className="done">
            DEPRECATED
          </option>
        </select>
        <label htmlFor="name">Version Number</label>
        <input
          type="text"
          id="version"
          placeholder="v.0.0.01 beta"
          {...register("version", {
            required: "please provide update version",
          })}
        />
        <label htmlFor="desc">Project Description</label>
        <Controller
          control={control}
          render={({ field }) => (
            <RichText description={field.value} onChange={field.onChange} />
          )}
          name="body"
          rules={{ required: true }}
          required
        />
        <button onClick={handleSubmit(onSubmit)}>Submit</button>{" "}
      </div>
    </section>
  );
};

export default FormPage;
