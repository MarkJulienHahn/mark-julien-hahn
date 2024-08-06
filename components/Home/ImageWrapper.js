import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

const ImageWrapper = ({ bgImage }) => {
  const [background, setBackground] = useState(null);
  useEffect(() => setBackground(bgImage?.background), [bgImage]);

  return (
    <div className="imgWrapper" style={{ background: background }}>
      <Link
        href={`/${bgImage?.link}`}
        style={{ width: "100vw", height: "100vh" }}
      >
        {bgImage?.url && (
          <>
            {bgImage?.type == "image" ? (
              <Image
                src={bgImage.url}
                fill
                style={{ objectFit: bgImage.fitType || "contain" }}
              />
            ) : (
              <video
                style={{
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                }}
                autoPlay
                muted
                playsInline
                loop
              >
                <source src={bgImage.url} type="video/mp4" />
              </video>
            )}
          </>
        )}
      </Link>
    </div>
  );
};

export default ImageWrapper;
