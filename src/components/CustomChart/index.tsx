import React, { useRef, useEffect } from "react";

interface RadarChartProps {
  labels: string[];
  values: number[];
  maxValue?: number;
  size?: number;
}

const RadarCanvasChart: React.FC<RadarChartProps> = ({
  labels,
  values,
  maxValue = 100,
  size = 300,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const count = labels.length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);
    ctx.save();

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;

    const getPoint = (i: number, value: number, scale = 1) => {
      const angle = ((Math.PI * 2) / count) * i - Math.PI / 2;
      const r = (value / maxValue) * radius * scale;
      return {
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle),
      };
    };

    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;

    for (let layer = 1; layer <= 5; layer++) {
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const { x, y } = getPoint(i, maxValue, layer / 5);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    for (let i = 0; i < count; i++) {
      const { x, y } = getPoint(i, maxValue);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.fillStyle = "#444";
    ctx.font = "12px sans-serif";
    for (let i = 0; i < count; i++) {
      const { x, y } = getPoint(i, maxValue * 1.1);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(labels[i], x, y);
    }

    ctx.beginPath();
    ctx.strokeStyle = "#00c853";
    ctx.fillStyle = "rgba(0, 200, 83, 0.3)";
    ctx.lineWidth = 2;
    for (let i = 0; i < count; i++) {
      const { x, y } = getPoint(i, values[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.restore();
  }, [labels, values, size, maxValue]);

  return <canvas ref={canvasRef} width={size} height={size} />;
};

export default RadarCanvasChart;
