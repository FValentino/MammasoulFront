import { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  styles?: string;
}

export default function Image({ src, alt, styles }: ImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <>
      {loading && (
        <div className="absolute">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      )}

      {!error ? (
        <img
          src={src}
          alt={alt}
          className={ styles ? styles : `object-cover w-full h-full ${loading ? "hidden" : "block"}` }
          //className={`object-cover w-full h-full ${loading ? "hidden" : "block"}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
          Imagen no disponible
        </div>
      )}
    </>
  );
}
