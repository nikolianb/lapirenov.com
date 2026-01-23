import React, { useEffect, useRef, useState } from 'react';

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  beforeLabel = 'Avant',
  afterLabel = 'Après',
  initial = 50,
}) {
  const containerRef = useRef(null);
  const [value, setValue] = useState(initial);
  const [isDragging, setIsDragging] = useState(false);

  const clamp = (next) => Math.min(100, Math.max(0, next));

  const updateFromClientX = (clientX) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setValue(clamp(percent));
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (event) => updateFromClientX(event.clientX);
    const handleUp = () => setIsDragging(false);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp, { once: true });

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-[#1e3a8a] mb-4">{title}</h3>
      )}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-gray-100 shadow-lg bg-gray-100 cursor-ew-resize"
        onPointerDown={(event) => {
          setIsDragging(true);
          updateFromClientX(event.clientX);
        }}
        style={{ touchAction: 'none' }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          loading="lazy"
          decoding="async"
          className="block w-full h-[260px] sm:h-[320px] md:h-[360px] object-cover"
        />
        <img
          src={afterImage}
          alt={afterLabel}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        />

        <span className="absolute left-4 top-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {beforeLabel}
        </span>
        <span className="absolute right-4 top-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {afterLabel}
        </span>

        <button
          type="button"
          onPointerDown={(event) => {
            event.stopPropagation();
            setIsDragging(true);
            updateFromClientX(event.clientX);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') setValue((prev) => clamp(prev - 2));
            if (event.key === 'ArrowRight') setValue((prev) => clamp(prev + 2));
          }}
          className="absolute inset-y-0 -translate-x-1/2 flex items-center"
          style={{ left: `${value}%` }}
          aria-label="Faire glisser pour comparer avant/après"
        >
          <div className="absolute inset-y-0 w-0.5 bg-white/80 shadow" />
          <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-[#1e3a8a] rounded-full bg-white" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
