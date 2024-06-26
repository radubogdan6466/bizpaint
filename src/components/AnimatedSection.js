import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Zoom, Navigation } from "swiper/modules";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/AnimatedSection.css";

const ImageGallery = ({ images }) => {
  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      slidesPerView={1}
      zoom={true}
      navigation={true}
      className="image-gallery"
      modules={[Zoom, Navigation]}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="swiper-zoom-container">
            <img src={image} alt={`Mercedes Car ${index + 1}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const AnimatedSection = ({ title, description, images }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          section.classList.add("animate");
        } else {
          section.classList.remove("animate");
        }
      }
    };

    // Adăugăm un listener pentru event-ul de scroll
    window.addEventListener("scroll", handleScroll);

    // Ștergem listener-ul când componenta este demontată
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // [] asigură că efectul se activează doar la montare și se curăță la demontare

  return (
    <div ref={sectionRef} className="animated-section">
      <h2>{title}</h2>
      <p>{description}</p>
      <ImageGallery images={images} />
    </div>
  );
};

export default AnimatedSection;
