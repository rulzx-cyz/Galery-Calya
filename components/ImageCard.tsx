
import React from 'react';

interface ImageCardProps {
  src: string;
  alt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 group cursor-pointer flex flex-col"
        onClick={openModal}
      >
        <div className="w-full aspect-[9/16] overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover" 
            loading="lazy"
          />
        </div>
        <div className="p-4 bg-white">
          <p className="text-custom-pink-700 text-sm font-semibold truncate group-hover:text-custom-pink-500 transition-colors duration-300">
            {alt}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
          onClick={closeModal}
        >
          <div 
            className="bg-white p-2 sm:p-4 rounded-lg shadow-2xl max-w-3xl max-h-[90vh] overflow-auto flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto max-h-[calc(80vh-4rem)] rounded-md object-contain" // Adjusted max-h to account for text and button
            />
            <p className="mt-3 sm:mt-4 text-center text-gray-700 font-semibold">{alt}</p>
            <button
              onClick={closeModal}
              className="mt-3 sm:mt-4 w-full bg-custom-pink-500 hover:bg-custom-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-custom-pink-400 focus:ring-opacity-75"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCard;
