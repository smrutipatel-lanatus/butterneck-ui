export default function DocumentBg({ width = 16 }) {
  return (
    <svg height="120" viewBox="0 0 40 40" width={width} xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <circle cx="20" cy="20" fill="#fc0" r="20" />
        <path
          d="m13.75 9c-1.2857143 0-2.25.97267081-2.25 2.2695652v18.1565218c0 1.2968944.9642857 2.2695652 2.25 2.2695652h13.5c1.2857143 0 2.25-.9726708 2.25-2.2695652v-13.6173913l-6.75-6.8086957zm7.875 7.9434783v-6.3223603l6.2678571 6.3223603z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}
