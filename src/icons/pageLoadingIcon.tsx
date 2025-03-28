export default function PageLoadingIcon() {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="64px"
      height="64px"
      viewBox="0 0 24 18"
      xmlSpace="preserve"
    >
      <rect
        x="0"
        y="0"
        width="6"
        height="18"
        fill="currentColor"
        strokeLinejoin="round"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .5; 1"
          begin="0s"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="9"
        y="0"
        width="6"
        height="18"
        fill="currentColor"
        strokeLinejoin="round"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .5; 1"
          begin="0.5s"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="18"
        y="0"
        width="6"
        height="18"
        fill="currentColor"
        strokeLinejoin="round"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .5; 1"
          begin="1s"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
