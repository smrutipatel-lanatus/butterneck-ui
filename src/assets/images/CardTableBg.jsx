export default function CardTableBg({ width = 16 }) {
  return (
    <svg width={width} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={40} cy={40} r={40} fill="#FFA237" />
      <rect x={32} y={24} width={16} height={16} rx={2} fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34 27C34 26.4477 34.4477 26 35 26H42C42.5523 26 43 26.4477 43 27C43 27.5523 42.5523 28 42 28H35C34.4477 28 34 27.5523 34 27Z"
        fill="#FFA237"
      />
      <rect x={14} y={24} width={16} height={25} rx={2} fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 27C16 26.4477 16.4477 26 17 26H24C24.5523 26 25 26.4477 25 27C25 27.5523 24.5523 28 24 28H17C16.4477 28 16 27.5523 16 27Z"
        fill="#FFA237"
      />
      <rect x={50} y={24} width={16} height={32} rx={2} fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52 27C52 26.4477 52.4477 26 53 26H60C60.5523 26 61 26.4477 61 27C61 27.5523 60.5523 28 60 28H53C52.4477 28 52 27.5523 52 27Z"
        fill="#FFA237"
      />
    </svg>
  );
}
