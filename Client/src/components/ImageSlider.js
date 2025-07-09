import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
  "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg",
  "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
];

const ImageSlider = ({arrImages}) => {
  const [current, setCurrent] = useState(0);
  const length = arrImages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="w-full flex flex-col items-center ">
      {/* Slide chính */}
      <div className="relative overflow-hidden rounded-xl shadow-lg w-[650px] h-[400px]">
        <img
          src={arrImages[current]}
          alt={`Slide ${current}`}
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Nút trái */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
        >
          <FaChevronLeft />
        </button>

        {/* Nút phải */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Chấm tròn pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {arrImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center items-center mt-4 gap-3 flex-wrap">
        {arrImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            className={`w-[60px] h-[60px] object-cover rounded-md cursor-pointer border-2 ${
              index === current ? "border-blue-600" : "border-transparent"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
