import useAxios from "../../utils/hooks/useAxios";
export const PostExample = () => {
  const options = {
    body: {
      ID_Person_: 8,
      P_NAME: "Elizabeth"
    },
  };
  const { data, isPending } = useAxios(
    "http://localhost:3000/registro/personExample/addPerson",
    "post",
    options
  );

  return <div>{!isPending ? data.message : "Cargando..."}</div>;
};
