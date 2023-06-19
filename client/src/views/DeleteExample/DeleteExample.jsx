import useAxios from "../../utils/hooks/useAxios";
export const DeleteExample = () => {
  const options = {
    body: {
      ID_Person_: 7
    },
  };
  const { data, isPending } = useAxios(
    "http://localhost:3000/registro/personExample/deletePerson",
    "del",
    options
  );
  

  return <div>{!isPending ? data.message : "Cargando..."}</div>;
};
