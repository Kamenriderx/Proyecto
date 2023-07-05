import { useState } from "react";

const Carrusell = ({user}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [nameImage, setNameImage] = useState([]);

  //este estado se enviara al server
  console.log('nameImage:, ', nameImage)

  const handleFileChange = (event) => {
    const files = event.target.files;

    setNameImage((prevImages) => [...prevImages.slice(-2), files[0]]);

    const selectedFiles = Array.from(files);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages.slice(-2), ...imageUrls]);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {
        !user.visitante && (
      <div className="mr-auto mb-4">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="rounded-full"
        />
      </div>
        )
      }
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out transform">
            {selectedImages.map((imageUrl, index) => (
              <img
                key={index}
                className="w-52 h-52 object-cover border-2 m-1 border-gray-700"
                src={imageUrl}
                alt={`Imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrusell;
