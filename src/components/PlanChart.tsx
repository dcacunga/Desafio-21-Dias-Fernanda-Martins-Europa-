import { getPlanChartPoints } from '../utils/navigation';

interface PlanChartProps {
  days: number;
}

export function PlanChart({ days }: PlanChartProps) {
  const points = getPlanChartPoints(days);

  return (
    <div className="chart">
      <svg
        viewBox="0 0 420 235"
        role="img"
        aria-label={`Calendário de três semanas, com ${days} momentos de prática planeados por semana`}
      >
        <defs>
          <linearGradient id="practice-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0891b2" stopOpacity=".25" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity=".01" />
          </linearGradient>
        </defs>
        <path
          d="M35 180H390M35 130H390M35 80H390M35 30H390"
          stroke="#eee"
          strokeDasharray="4 5"
        />
        <path
          d="M35 180 C80 180 90 150 145 130 S210 90 255 80 S335 30 385 30 L385 180H35Z"
          fill="url(#practice-fill)"
        />
        <path
          d="M35 180 C80 180 90 150 145 130 S210 90 255 80 S335 30 385 30"
          fill="none"
          stroke="#0891b2"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {points.map((pt, idx) => (
          <g key={idx}>
            <circle cx={pt.x} cy={pt.y} r="7" fill="#0891b2" stroke="white" strokeWidth="3" />
            <text
              x={pt.x}
              y={pt.y - 14}
              textAnchor="middle"
              fontSize="13"
              fontWeight="bold"
              fill="#0891b2"
            >
              {pt.label}
            </text>
          </g>
        ))}
        <text x="35" y="212" textAnchor="middle" fontSize="13" fill="#666">
          Hoje
        </text>
        <text x="145" y="212" textAnchor="middle" fontSize="13" fill="#666">
          Semana 1
        </text>
        <text x="255" y="212" textAnchor="middle" fontSize="13" fill="#666">
          Semana 2
        </text>
        <text x="385" y="212" textAnchor="middle" fontSize="13" fill="#666">
          Semana 3
        </text>
      </svg>
    </div>
  );
}
