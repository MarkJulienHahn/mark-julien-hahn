"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade } from "swiper/modules";

import { use100vh } from "react-div-100vh";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SingleSlider({ entry, setCurrentIndex, currentIndex }) {
  const height = use100vh();
  const [swiper, setSwiper] = useState(null);
  const [hoverText, setHoverText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleSlideClick = (e) => {
    if (!swiper) return;
    const { clientX } = e;
    const screenWidth = window.innerWidth;
    if (clientX < screenWidth / 2) {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const screenWidth = window.innerWidth;
    if (clientX < screenWidth / 2) {
      setHoverText("← previous");
    } else {
      setHoverText("next →");
    }
    setMousePosition({ x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setHoverText("");
  };

  useEffect(() => {
    setColor(entry.images[currentIndex].media.color);
    // setBackgroud
  }, [currentIndex]);

  console.log(entry);

  return (
    <div
      className="sliderWrapper"
      style={{ background: "white", height: height, position: "relative" }}
    >
      {entry.images.length && (
        <Swiper
          effect="fade"
          modules={[EffectFade]}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          loop={true}
          style={{ cursor: entry.images.length > 1 ? "none" : "default" }}
        >
          {entry.images.map((image, i) => (
            <SwiperSlide key={i}>
              <div
                className="slide-container"
                style={{
                  width: "100vw",
                  height: height,
                  position: "relative",
                }}
                onClick={handleSlideClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {image.type === "image" ? (
                  <>
                    {!imageLoaded && (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "grey",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 1,
                        }}
                      >
                        Loading image...
                      </div>
                    )}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: image?.media?.background,
                        zIndex: 1,
                      }}
                    >
                      <Image
                        src={image?.media?.url}
                        fill
                        style={{
                          objectFit: image?.media?.fitType || "contain",
                        }}
                        onLoadingComplete={() => setImageLoaded(true)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {!videoLoaded && (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          mixBlendMode: "difference",
                          top: 0,
                          left: 0,
                          zIndex: 1,
                        }}
                      >
                        Loading video...
                      </div>
                    )}
                    <video
                      style={{
                        width: "100%",
                        height: "100%",
                        background: image?.media?.background || "white",
                        zIndex: 1,
                      }}
                      autoPlay
                      muted
                      playsInline
                      loop
                      onCanPlayThrough={() => setVideoLoaded(true)}
                    >
                      <source src={image.media.url} type="video/mp4" />
                    </video>
                  </>
                )}
                {hoverText && entry.images.length > 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: mousePosition.y,
                      left: mousePosition.x,
                      transform: "translate(-50%, -50%)",
                      color: color,
                      cursor: "none",
                      mixBlendMode: "difference",
                      zIndex: 2,
                    }}
                  >
                    {hoverText}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
