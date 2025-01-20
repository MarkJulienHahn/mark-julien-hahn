import Image from "next/image";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

import type { ImageType } from "../../types/types";

type ImageData = {
  images: ImageType[];
  slug: { current: string };
  inView: boolean;
  setCurrentIndex: (value: string) => void;
  currentIndex: string | null;
};

export default function ImageComponent({
  images,
  slug,
  inView,
  setCurrentIndex,
  currentIndex,
}: ImageData) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (inView) {
      setCurrentIndex(slug.current);
    }
  }, [inView, setCurrentIndex, slug]);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const clickPosition = clientX - left;

    if (swiperRef.current) {
      if (clickPosition > width / 2) {
        swiperRef.current.slideNext();
      } else {
        swiperRef.current.slidePrev();
      }
    }
  };

  return (
    <div
      className={`imageSlider ${currentIndex !== slug.current ? "imageSlider__disabled" : ""}`}
      ref={ref}
    >
      {currentIndex === slug.current &&
        images &&
        images.length > 0 &&
        ref?.current?.clientWidth && (
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            effect={"fade"}
            modules={[EffectFade]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            fadeEffect={{ crossFade: true }}
            loop={true}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
                  {image.type === "image" && (
                    <Image
                      src={image.media.url || "/placeholder.svg"}
                      width={
                        image.media?.dimensions?.aspectRatio && ref.current
                          ? image.media.dimensions.aspectRatio > 1
                            ? ref.current.clientWidth
                            : ref.current.clientHeight *
                              image.media.dimensions.aspectRatio
                          : 0
                      }
                      height={
                        image.media?.dimensions?.aspectRatio && ref.current
                          ? image.media.dimensions.aspectRatio > 1
                            ? ref.current.clientWidth /
                              image.media.dimensions.aspectRatio
                            : ref.current.clientHeight
                          : 0
                      }
                      alt={image.alt || ""}
                      style={{
                        objectFit: "contain",
                        objectPosition: "top right",
                        background: image?.media?.color || undefined,
                      }}
                    />
                  )}

                  {image.type === "video" && (
                    <div
                      className="video-container"
                      style={{
                        width:
                          image.media?.dimensions?.aspectRatio && ref.current
                            ? `${
                                image.media.dimensions.aspectRatio > 1
                                  ? ref.current.clientWidth
                                  : ref.current.clientHeight *
                                    image.media.dimensions.aspectRatio
                              }px`
                            : "100%",
                        height:
                          image.media?.dimensions?.aspectRatio && ref.current
                            ? `${
                                image.media.dimensions.aspectRatio > 1
                                  ? ref.current.clientWidth /
                                    image.media.dimensions.aspectRatio
                                  : ref.current.clientHeight
                              }px`
                            : "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <video
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "left",
                        }}
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={image.media.url} type="video/mp4" />
                      </video>
                    </div>
                  )}

                  <div
                    className="caption"
                    style={{
                      width:
                        image.media?.dimensions?.aspectRatio && ref.current
                          ? `${
                              image.media.dimensions.aspectRatio > 1
                                ? ref.current.clientWidth
                                : ref.current.clientHeight *
                                  image.media.dimensions.aspectRatio
                            }px`
                          : "100%",
                    }}
                  >
                    <p className="caption__index text__big">
                      {index + 1} / {images.length}
                    </p>
                    <p className="text__small">{image.media.caption || ""}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
    </div>
  );
}
