import readerCSV from "../../utils/helpers/readerCSV";
const CsvReader = () => {
  const handleOnFileLoad = async (event) => {
    const file = event.target.files[0];
    try{
        console.log(await readerCSV(file));

    }catch(e){
        console.log(e);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleOnFileLoad} />
    </div>
  );
};

export default CsvReader;
