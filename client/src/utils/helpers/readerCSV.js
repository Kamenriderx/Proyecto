import Papa from "papaparse";

const readerCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export default readerCSV;
