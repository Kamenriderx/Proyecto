import useAxios from "../../utils/hooks/useAxios";

const UpdateExampe = () => {
  const options = {
    body: {
      ID_Person_: 7,
      P_NAME: "Ariela Caceres",
    },
  };
  const { data, isPending } = useAxios(
    "http://localhost:3000/registro/personExample/updatePerson",
    "put",
    options
  );

  return (
    <div>
        {
            !isPending?data.message:'Cargando'

        }
        
    </div>
  );
};

export default UpdateExampe;
