function InterviewArt() {
  return (
    <svg viewBox="0 0 360 220" className="preview-art">
      <rect x="28" y="28" width="196" height="164" rx="16" />
      <circle cx="126" cy="84" r="18" />
      <path d="M90 128c8-22 20-32 36-32s28 10 36 32" />
      <path d="M248 58h84M248 84h70M248 110h78M248 136h58" />
      <g className="wave">
        {Array.from({ length: 10 }, (_, bar) => {
          const height = 12 + ((bar * 19) % 26);
          return <rect key={bar} x={44 + bar * 16} y={168 - height} width="8" height={height} rx="2" />;
        })}
      </g>
    </svg>
  );
}

function LatticeArt() {
  const nodes = [
    [70, 50],
    [170, 36],
    [270, 64],
    [110, 120],
    [200, 110],
    [290, 140],
    [80, 180],
    [180, 176],
    [280, 188],
  ];
  const lines = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
    [3, 6],
    [4, 7],
    [5, 8],
    [6, 7],
    [7, 8],
  ];

  return (
    <svg viewBox="0 0 360 220" className="preview-art">
      {lines.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={nodes[from][0]}
          y1={nodes[from][1]}
          x2={nodes[to][0]}
          y2={nodes[to][1]}
        />
      ))}
      {nodes.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />
      ))}
    </svg>
  );
}

function SignalArt() {
  return (
    <svg viewBox="0 0 360 220" className="preview-art">
      <path d="M30 160C70 160 80 60 130 60s50 120 100 120 40-90 90-90" />
      <circle cx="180" cy="110" r="54" />
      <circle cx="180" cy="110" r="32" />
      <circle cx="180" cy="110" r="8" />
    </svg>
  );
}

const ARTS = {
  interview: InterviewArt,
  lattice: LatticeArt,
  signal: SignalArt,
};

export default function ProjectPreview({ variant, image = "", title = "Project", plate = "" }) {
  if (image) {
    return (
      <div className={`preview preview-${variant} preview-photo${plate === "light" ? " preview-light" : ""}`}>
        <img src={image} alt={`${title} preview`} />
      </div>
    );
  }

  const Art = ARTS[variant] ?? SignalArt;
  return (
    <div className={`preview preview-${variant}`} aria-hidden="true">
      <Art />
    </div>
  );
}
