import React, { useCallback, useEffect, useRef, useState } from 'react';

interface MeasureRulerProps {
  initialValue?: number;
  unit?: string;
  altUnit?: string;
  min?: number;
  max?: number;
  onChange: (val: number, unit: string) => void;
  onSubmit: (val: number) => void;
}

export function MeasureRuler({
  initialValue = 165,
  unit = 'cm',
  altUnit = 'pol',
  min = 100,
  max = 230,
  onChange,
  onSubmit,
}: MeasureRulerProps) {
  const [activeUnit, setActiveUnit] = useState(unit);
  const inchRatio = 1 / 2.54;
  const isInch = activeUnit === altUnit;

  const currentMin = isInch ? Math.ceil(min * inchRatio * 10) / 10 : min;
  const currentMax = isInch ? Math.floor(max * inchRatio * 10) / 10 : max;
  const startInt = Math.floor(currentMin);
  const endInt = Math.ceil(currentMax);

  const [valueCm, setValueCm] = useState(initialValue);
  const displayVal = isInch
    ? Math.round(valueCm * inchRatio * 10) / 10
    : Math.round(valueCm * 10) / 10;

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; val: number } | null>(null);

  const updatePosition = useCallback(
    (val: number) => {
      if (!viewportRef.current || !trackRef.current) return;
      const clientW = viewportRef.current.clientWidth || 300;
      const offset = clientW / 2 - (val - startInt) * 20 - 10;
      trackRef.current.style.transform = `translateX(${offset}px)`;
    },
    [startInt]
  );

  useEffect(() => {
    updatePosition(displayVal);
  }, [displayVal, updatePosition]);

  useEffect(() => {
    const handleResize = () => updatePosition(displayVal);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [displayVal, updatePosition]);

  const setClampedValue = (val: number) => {
    const clamped = Math.round(Math.max(currentMin, Math.min(currentMax, val)) * 10) / 10;
    const finalCm = isInch ? Math.round((clamped / inchRatio) * 10) / 10 : clamped;
    setValueCm(finalCm);
    onChange(finalCm, activeUnit);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button === 0) {
      dragRef.current = { x: e.clientX, val: displayVal };
      if (viewportRef.current) {
        viewportRef.current.setPointerCapture(e.pointerId);
        viewportRef.current.classList.add('dragging');
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const delta = -(e.clientX - dragRef.current.x) / 20;
    setClampedValue(dragRef.current.val + delta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    if (viewportRef.current) {
      try {
        viewportRef.current.releasePointerCapture(e.pointerId);
      } catch (_) {}
      viewportRef.current.classList.remove('dragging');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let nextVal = displayVal;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      nextVal += e.shiftKey ? 0.1 : 1;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      nextVal -= e.shiftKey ? 0.1 : 1;
    } else if (e.key === 'Home') {
      nextVal = currentMin;
    } else if (e.key === 'End') {
      nextVal = currentMax;
    } else {
      return;
    }
    e.preventDefault();
    setClampedValue(nextVal);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = (e.deltaX || e.deltaY) / 20;
    setClampedValue(displayVal + delta);
  };

  const handleUnitChange = (newUnit: string) => {
    if (newUnit !== activeUnit) {
      setActiveUnit(newUnit);
      onChange(valueCm, newUnit);
    }
  };

  const ticks = [];
  for (let i = startInt; i <= endInt; i++) {
    const isMajor = i % 10 === 0;
    const isMid = i % 5 === 0 && !isMajor;
    ticks.push(
      <span
        key={i}
        className={`ruler-tick ${isMajor ? 'major' : isMid ? 'middle' : ''}`}
      >
        {isMajor && <b>{i}</b>}
      </span>
    );
  }

  return (
    <form
      id="answer-form"
      className="measure"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(valueCm);
      }}
    >
      <div className="unit-tabs">
        <button
          type="button"
          data-unit={unit}
          className={isInch ? '' : 'active'}
          onClick={() => handleUnitChange(unit)}
        >
          {unit}
        </button>
        <button
          type="button"
          data-unit={altUnit}
          className={isInch ? 'active' : ''}
          onClick={() => handleUnitChange(altUnit)}
        >
          {altUnit}
        </button>
      </div>

      <div className="measure-display">
        <span id="measure-number">{displayVal}</span>
        <span className="unit-text">{activeUnit}</span>
      </div>

      <div
        ref={viewportRef}
        className="ruler-viewport"
        tabIndex={0}
        role="slider"
        aria-label="Altura"
        aria-valuemin={currentMin}
        aria-valuemax={currentMax}
        aria-valuenow={displayVal}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
      >
        <div ref={trackRef} className="ruler-track">
          {ticks}
        </div>
        <i className="ruler-needle" />
      </div>

      <input
        className="accessible-range"
        aria-hidden="true"
        tabIndex={-1}
        id="measure-range"
        type="range"
        min={currentMin}
        max={currentMax}
        step={0.1}
        value={displayVal}
        onChange={(e) => setClampedValue(parseFloat(e.target.value))}
      />

      <p className="helper">Arrasta para ajustar ou escreve o valor.</p>
      <button className="primary" type="submit">
        Continuar
      </button>
    </form>
  );
}
