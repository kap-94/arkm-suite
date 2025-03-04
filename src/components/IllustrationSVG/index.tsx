import React from "react";
import classNames from "classnames/bind";
import styles from "./IllustrationSVG.module.scss";

const cx = classNames.bind(styles);

interface IllustrationSVGProps {
  className?: string;
  variant?:
    | "default"
    | "geometric"
    | "waves"
    | "orbital"
    | "complementary"
    | "fragments"
    | "layers"
    | "neomorphic"
    | "zigzag"
    | "fluid"
    | "tubular"
    | "organic";
}

export const IllustrationSVG: React.FC<IllustrationSVGProps> = ({
  className,
  variant = "default",
}) => {
  return (
    <div className={cx("illustration-svg", className)}>
      <svg
        viewBox="0 0 500 532"
        className={cx("illustration-svg__svg")}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="90%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="90%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient
            id="radialGradient1"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#6366f1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
        </defs>

        {variant === "default" && (
          <>
            {/* Abstract Shape 1 - Hexagon */}
            <polygon
              points="250,60 350,150 350,300 250,390 150,300 150,150"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient1)"
              opacity="0.6"
            />

            {/* Abstract Shape 2 - Rhombus */}
            <polygon
              points="250,100 350,250 250,400 150,250"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient2)"
              opacity="0.6"
            />
          </>
        )}

        {variant === "geometric" && (
          <>
            {/* Geometric Shape 1 - Triangles Pattern */}
            <polygon
              points="250,50 350,200 150,200"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient1)"
            />
            <polygon
              points="250,450 350,300 150,300"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient2)"
            />

            {/* Geometric Shape 2 - Interconnected Squares */}
            <rect
              x="175"
              y="175"
              width="150"
              height="150"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient2)"
              opacity="0.15"
              transform="rotate(15, 250, 250)"
            />
            <rect
              x="175"
              y="175"
              width="150"
              height="150"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient1)"
              opacity="0.15"
              transform="rotate(30, 250, 250)"
            />

            {/* Geometric Shape 3 - Diagonal Lines */}
            <line
              x1="50"
              y1="450"
              x2="450"
              y2="50"
              className={cx("illustration-svg__line")}
              stroke="url(#gradient3)"
              strokeWidth="40"
              opacity="0.1"
            />
            <line
              x1="100"
              y1="450"
              x2="450"
              y2="100"
              className={cx("illustration-svg__line")}
              stroke="url(#gradient1)"
              strokeWidth="25"
              opacity="0.1"
            />
          </>
        )}

        {variant === "waves" && (
          <>
            {/* Wave Pattern 1 - Curved Waves */}
            <path
              d="M0,250 C50,230 100,270 150,250 C200,230 250,270 300,250 C350,230 400,270 450,250 C500,230 550,270 600,250"
              className={cx("illustration-svg__path")}
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="60"
              opacity="0.15"
              transform="translate(0, -50)"
            />
            <path
              d="M0,250 C50,230 100,270 150,250 C200,230 250,270 300,250 C350,230 400,270 450,250 C500,230 550,270 600,250"
              className={cx("illustration-svg__path")}
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="40"
              opacity="0.2"
              transform="translate(0, 0)"
            />
            <path
              d="M0,250 C50,230 100,270 150,250 C200,230 250,270 300,250 C350,230 400,270 450,250 C500,230 550,270 600,250"
              className={cx("illustration-svg__path")}
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="20"
              opacity="0.25"
              transform="translate(0, 50)"
            />

            {/* Wave Pattern 2 - Flowing Curves */}
            <path
              d="M0,400 Q125,350 250,400 T500,400"
              className={cx("illustration-svg__path")}
              fill="url(#gradient1)"
              opacity="0.1"
            />
            <path
              d="M0,100 Q125,150 250,100 T500,100"
              className={cx("illustration-svg__path")}
              fill="url(#gradient2)"
              opacity="0.1"
            />
          </>
        )}

        {variant === "orbital" && (
          <>
            {/* Orbital Shape 1 - Concentric Circles */}
            <circle
              cx="250"
              cy="250"
              r="180"
              className={cx("illustration-svg__shape")}
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="15"
              opacity="0.2"
            />
            <circle
              cx="250"
              cy="250"
              r="140"
              className={cx("illustration-svg__shape")}
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="10"
              opacity="0.15"
            />
            <circle
              cx="250"
              cy="250"
              r="100"
              className={cx("illustration-svg__shape")}
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="5"
              opacity="0.1"
            />

            {/* Orbital Shape 2 - Elliptical Paths */}
            <ellipse
              cx="250"
              cy="250"
              rx="200"
              ry="100"
              className={cx("illustration-svg__shape")}
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="4"
              opacity="0.1"
              transform="rotate(30, 250, 250)"
            />
            <ellipse
              cx="250"
              cy="250"
              rx="180"
              ry="90"
              className={cx("illustration-svg__shape")}
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="3"
              opacity="0.15"
              transform="rotate(60, 250, 250)"
            />

            {/* Orbital Shape 3 - Accent Points */}
            {/* <circle
              cx="250"
              cy="70"
              r="15"
              className={cx("illustration-svg__accent")}
              fill="url(#gradient1)"
              opacity="0.3"
            />
            <circle
              cx="370"
              cy="250"
              r="10"
              className={cx("illustration-svg__accent")}
              fill="url(#gradient2)"
              opacity="0.3"
            />
            <circle
              cx="250"
              cy="430"
              r="15"
              className={cx("illustration-svg__accent")}
              fill="url(#gradient1)"
              opacity="0.3"
            />
            <circle
              cx="130"
              cy="250"
              r="10"
              className={cx("illustration-svg__accent")}
              fill="url(#gradient2)"
              opacity="0.3"
            /> */}
          </>
        )}

        {variant === "complementary" && (
          <>
            {/* Complementary Abstract Shape 1 - Circle */}
            <circle
              cx="250"
              cy="250"
              r="180"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient2)"
            />

            {/* Complementary Abstract Shape 2 - Ellipse */}
            <ellipse
              cx="250"
              cy="300"
              rx="150"
              ry="100"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient1)"
              opacity="0.1"
            />
          </>
        )}

        {variant === "fragments" && (
          <>
            {/* Abstract Fragments Shape 1 - Scattered Polygons */}
            <polygon
              points="100,100 170,50 200,120 150,180 80,150"
              className={cx("illustration-svg__fragment")}
              fill="url(#gradient1)"
              opacity="0.25"
            />
            <polygon
              points="280,80 360,110 340,190 290,220 250,170"
              className={cx("illustration-svg__fragment")}
              fill="url(#gradient2)"
              opacity="0.5"
            />
            <polygon
              points="120,300 160,250 220,280 240,350 180,380 130,350"
              className={cx("illustration-svg__fragment")}
              fill="url(#gradient3)"
              opacity="0.15"
            />
            <polygon
              points="300,300 340,280 390,320 370,390 310,380"
              className={cx("illustration-svg__fragment")}
              fill="url(#gradient1)"
              opacity="0.5"
            />
            <polygon
              points="200,180 260,200 250,250 200,260 170,220"
              className={cx("illustration-svg__fragment")}
              fill="url(#gradient4)"
              opacity="0.35"
            />

            {/* Abstract Fragments Shape 2 - Blur Circle Groups */}
            <circle
              cx="170"
              cy="120"
              r="60"
              className={cx("illustration-svg__blur")}
              fill="url(#gradient2)"
              opacity="0.1"
              filter="url(#blur1)"
            />
            <circle
              cx="320"
              cy="140"
              r="70"
              className={cx("illustration-svg__blur")}
              fill="url(#gradient1)"
              opacity="0.1"
              filter="url(#blur1)"
            />
            <circle
              cx="180"
              cy="340"
              r="80"
              className={cx("illustration-svg__blur")}
              fill="url(#gradient3)"
              opacity="0.08"
              filter="url(#blur1)"
            />
            <circle
              cx="350"
              cy="350"
              r="65"
              className={cx("illustration-svg__blur")}
              fill="url(#gradieeent2)"
              opacity="0.1"
              filter="url(#blur1)"
            />
          </>
        )}

        {variant === "layers" && (
          <>
            {/* Layered Abstract Shapes */}
            <path
              d="M100,150 C150,100 250,120 300,80 C350,40 400,100 450,120 L450,250 C400,230 350,250 300,290 C250,330 150,310 100,350 Z"
              className={cx("illustration-svg__layer")}
              fill="url(#gradient1)"
              opacity="0.15"
              transform="translate(0, -40)"
            />
            <path
              d="M50,200 C100,170 200,190 250,160 C300,130 350,150 450,120 L450,270 C350,250 300,280 250,300 C200,320 100,300 50,330 Z"
              className={cx("illustration-svg__layer")}
              fill="url(#gradient2)"
              opacity="0.2"
              transform="translate(0, -20)"
            />
            <path
              d="M0,230 C80,210 150,230 250,200 C350,170 400,190 500,170 L500,300 C400,320 350,300 250,330 C150,360 80,340 0,370 Z"
              className={cx("illustration-svg__layer")}
              fill="url(#gradient3)"
              opacity="0.25"
            />
            <path
              d="M0,260 C100,240 150,260 250,240 C350,220 400,240 500,210 L500,340 C400,370 350,350 250,380 C150,410 100,390 0,420 Z"
              className={cx("illustration-svg__layer")}
              fill="url(#gradient4)"
              opacity="0.3"
              transform="translate(0, 20)"
            />

            {/* Accent Circles */}
            <circle
              cx="120"
              cy="140"
              r="15"
              className={cx("illustration-svg__accent")}
              fill="#6366f1"
              opacity="0.2"
            />
            <circle
              cx="350"
              cy="180"
              r="12"
              className={cx("illustration-svg__accent")}
              fill="#8b5cf6"
              opacity="0.2"
            />
            <circle
              cx="200"
              cy="380"
              r="18"
              className={cx("illustration-svg__accent")}
              fill="#6366f1"
              opacity="0.15"
            />
          </>
        )}

        {variant === "neomorphic" && (
          <>
            {/* Neomorphic Base Shape */}
            <circle
              cx="250"
              cy="250"
              r="200"
              className={cx("illustration-svg__neomorphic-base")}
              fill="url(#radialGradient1)"
              opacity="0.3"
            />

            {/* Abstract Neomorphic Elements */}
            <path
              d="M150,150 C200,100 300,100 350,150 C400,200 400,300 350,350 C300,400 200,400 150,350 C100,300 100,200 150,150 Z"
              className={cx("illustration-svg__neomorphic-shape")}
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="8"
              opacity="0.15"
            />
            <path
              d="M180,180 C220,140 280,140 320,180 C360,220 360,280 320,320 C280,360 220,360 180,320 C140,280 140,220 180,180 Z"
              className={cx("illustration-svg__neomorphic-shape")}
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="6"
              opacity="0.2"
            />
            <path
              d="M210,210 C235,185 265,185 290,210 C315,235 315,265 290,290 C265,315 235,315 210,290 C185,265 185,235 210,210 Z"
              className={cx("illustration-svg__neomorphic-shape")}
              fill="none"
              stroke="url(#gradient3)"
              strokeWidth="4"
              opacity="0.25"
            />

            {/* Inner Elements */}
            <circle
              cx="250"
              cy="250"
              r="40"
              className={cx("illustration-svg__neomorphic-inner")}
              fill="url(#gradient4)"
              opacity="0.3"
            />

            {/* Abstract Lines */}
            <line
              x1="250"
              y1="50"
              x2="250"
              y2="180"
              className={cx("illustration-svg__neomorphic-line")}
              stroke="url(#gradient1)"
              strokeWidth="3"
              opacity="0.15"
            />
            <line
              x1="250"
              y1="320"
              x2="250"
              y2="450"
              className={cx("illustration-svg__neomorphic-line")}
              stroke="url(#gradient1)"
              strokeWidth="3"
              opacity="0.15"
            />
            <line
              x1="50"
              y1="250"
              x2="180"
              y2="250"
              className={cx("illustration-svg__neomorphic-line")}
              stroke="url(#gradient2)"
              strokeWidth="3"
              opacity="0.15"
            />
            <line
              x1="320"
              y1="250"
              x2="450"
              y2="250"
              className={cx("illustration-svg__neomorphic-line")}
              stroke="url(#gradient2)"
              strokeWidth="3"
              opacity="0.15"
            />
          </>
        )}

        {variant === "zigzag" && (
          <>
            {/* ZigZag Pattern 1 - Main Pattern */}
            <polyline
              points="50,150 100,100 150,150 200,100 250,150 300,100 350,150 400,100 450,150"
              className={cx("illustration-svg__line")}
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="12"
              opacity="0.6"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />

            <polyline
              points="50,200 100,150 150,200 200,150 250,200 300,150 350,200 400,150 450,200"
              className={cx("illustration-svg__line")}
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="8"
              opacity="0.5"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />

            <polyline
              points="50,250 100,200 150,250 200,200 250,250 300,200 350,250 400,200 450,250"
              className={cx("illustration-svg__line")}
              fill="none"
              stroke="url(#gradient3)"
              strokeWidth="5"
              opacity="0.35"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />

            {/* ZigZag Pattern 2 - Diamond Grid */}
            <polygon
              points="150,300 200,250 250,300 200,350"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient1)"
              opacity="0.6"
            />

            <polygon
              points="250,300 300,250 350,300 300,350"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient2)"
              opacity="0.5"
            />

            <polygon
              points="200,350 250,300 300,350 250,400"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient3)"
              opacity="0.3"
            />

            <polygon
              points="100,350 150,300 200,350 150,400"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient4)"
              opacity="0.25"
            />

            <polygon
              points="300,350 350,300 400,350 350,400"
              className={cx("illustration-svg__shape")}
              fill="url(#gradient1)"
              opacity="0.25"
            />

            {/* ZigZag Pattern 3 - Angular Accent Lines */}
            <polyline
              points="100,450 150,400 200,450 250,400 300,450 350,400 400,450"
              className={cx("illustration-svg__line")}
              fill="none"
              stroke="url(#gradient4)"
              strokeWidth="3"
              opacity="0.15"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
          </>
        )}

        {variant === "fluid" && (
          <>
            <path
              d="M50,250 Q150,100 250,250 T450,250"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="30"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M50,300 Q150,150 250,300 T450,300"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.3"
            />
          </>
        )}

        {/* Nueva variante "tubular" */}
        {variant === "tubular" && (
          <>
            <circle
              cx="250"
              cy="250"
              r="180"
              fill="url(#radialGradient1)"
              opacity="0.4"
              filter="url(#blur1)"
            />
            <circle
              cx="250"
              cy="250"
              r="120"
              fill="url(#gradient1)"
              opacity="0.3"
            />
          </>
        )}

        {/* Nueva variante "organic" */}
        {variant === "organic" && (
          <>
            <path
              d="M100,200 C150,100 350,100 400,200 C450,300 350,400 250,400 C150,400 50,300 100,200 Z"
              fill="url(#gradient2)"
              opacity="0.5"
            />
            <circle
              cx="180"
              cy="220"
              r="50"
              fill="url(#gradient1)"
              opacity="0.4"
            />
            <circle
              cx="320"
              cy="220"
              r="50"
              fill="url(#gradient1)"
              opacity="0.4"
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default IllustrationSVG;
