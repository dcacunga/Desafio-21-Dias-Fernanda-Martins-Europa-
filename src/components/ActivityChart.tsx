import { getActivityChartData } from '../utils/navigation';

interface ActivityChartProps {
  activity?: string;
}

export function ActivityChart({ activity }: ActivityChartProps) {
  const { x, y, label, heading, note } = getActivityChartData(activity);

  return (
    <>
      <div className="readiness-note">
        <strong>{heading}</strong>
        <p>{note}</p>
      </div>

      <div className="profile-chart">
        <h3>O teu nível de actividade informado</h3>
        <svg
          viewBox="0 0 420 270"
          role="img"
          aria-label={`Actividade informada: ${activity || 'Ainda não tenho uma rotina'}`}
        >
          <defs>
            <linearGradient id="profile-colors">
              <stop stopColor="#36bba8" />
              <stop offset=".45" stopColor="#e1ce33" />
              <stop offset=".7" stopColor="#f59b20" />
              <stop offset="1" stopColor="#ed604f" />
            </linearGradient>
          </defs>
          <path
            d="M32 30H388M32 74H388M32 118H388M32 162H388M32 206H388M32 30V206M121 30V206M210 30V206M299 30V206M388 30V206"
            fill="none"
            stroke="#c9c9c9"
            strokeDasharray="3 3"
          />
          <path
            d="M32 199C110 196 130 158 213 111S310 35 388 30V206H32Z"
            fill="url(#profile-colors)"
            opacity=".62"
          />
          <path
            d="M32 199C110 196 130 158 213 111S310 35 388 30"
            fill="none"
            stroke="url(#profile-colors)"
            strokeWidth="4"
          />
          {[
            [32, 199],
            [117, 174],
            [213, 111],
            [307, 49],
            [388, 30],
          ].map(([cx, cy], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r="5"
              fill="white"
              stroke="#aaa"
              strokeWidth="2"
            />
          ))}
          <circle cx={x} cy={y} r="6" fill="white" stroke="#ec4899" strokeWidth="3" />
          <rect
            x={Math.max(25, x - 23)}
            y={Math.max(0, y - 40)}
            width="56"
            height="25"
            rx="12"
            fill="#ec4899"
          />
          <text
            x={Math.max(53, x + 5)}
            y={Math.max(17, y - 23)}
            textAnchor="middle"
            fill="white"
            fontWeight="bold"
            fontSize="12"
          >
            Tu
          </text>
          <text x="32" y="232" textAnchor="start" fontSize="13" fill="#666">
            Sem rotina
          </text>
          <text x="150" y="232" textAnchor="middle" fontSize="13" fill="#666">
            Ocasional
          </text>
          <text x="266" y="232" textAnchor="middle" fontSize="13" fill="#666">
            Semanal
          </text>
          <text x="388" y="232" textAnchor="end" fontSize="13" fill="#666">
            Regular
          </text>
        </svg>

        <div className="activity-note">
          <strong>◉ {label}</strong>
          <p>
            Indicaste: {activity || 'Ainda não tenho uma rotina'}. O desafio ajuda-te a organizar o
            próximo passo.
          </p>
        </div>
      </div>
    </>
  );
}
