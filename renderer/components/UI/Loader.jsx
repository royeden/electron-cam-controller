// THX <3 <3 <3
// Cube design based on https://codepen.io/leusrox/pen/BvvNbq?editors=1100
// Loading animation from  https://icons8.com/cssload/en/3d-loaders

export default function Loader() {
  return (
    <>
      <div className="tetronimos animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div
            key={`loader-${i}`}
            className={`tetromino box-${i}`}
          >
            <div className="cube__face cube__face--front bg-secondary"></div>
            <div className="cube__face cube__face--left bg-secondary"></div>
            <div className="cube__face cube__face--top bg-secondary"></div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .cube__face {
          width: 50px;
          height: 50px;
          position: absolute;
          border: 6px solid #000;
        }

        .cube__face--front {
          box-shadow: inset -6px -6px 0 0 black;
        }

        .cube__face--left {
          box-shadow: inset 6px -6px 0 0 black;
        }

        .cube__face--top {
          box-shadow: inset -6px 6px 0 0 black;
        }

        .cube__face--front {
          transform: rotateY(0deg) translateZ(25px);
        }
        .cube__face--left {
          transform: rotateY(-90deg) translateZ(25px);
        }
        .cube__face--top {
          transform: rotateX(90deg) translateZ(25px);
        }

        .tetronimos {
          position: absolute;
          left: 50%;
          transform: translate(-81px, -70px);
        }

        .tetromino {
          width: 70px;
          height: 81px;
          position: absolute;
          transition: transform ease 1.2s;
          transform-style: preserve-3d;
          transform: rotateX(-36deg) rotateY(45deg);
        }

        .box-0 {
          animation: tetromino1 6s ease-out infinite;
        }

        .box-1 {
          animation: tetromino2 6s ease-out infinite;
        }

        .box-2 {
          animation: tetromino3 6s ease-out infinite;
          z-index: 2;
        }

        .box-3 {
          animation: tetromino4 6s ease-out infinite;
        }

        @keyframes tetromino1 {
          0%,
          40% {
            transform: translate(0, 0) rotateX(-36deg) rotateY(45deg);
          }
          50% {
            transform: translate(35px, -20px) rotateX(-36deg) rotateY(45deg);
          }
          60%,
          100% {
            transform: translate(70px, 0) rotateX(-36deg) rotateY(45deg);
          }
        }

        @keyframes tetromino2 {
          0%,
          20% {
            transform: translate(70px, 0px) rotateX(-36deg) rotateY(45deg);
          }
          40%,
          100% {
            transform: translate(104px, 20px) rotateX(-36deg) rotateY(45deg);
          }
        }

        @keyframes tetromino3 {
          0% {
            transform: translate(104px, 20px) rotateX(-36deg) rotateY(45deg);
          }
          20%,
          60% {
            transform: translate(70px, 39px) rotateX(-36deg) rotateY(45deg);
          }
          90%,
          100% {
            transform: translate(35px, 20px) rotateX(-36deg) rotateY(45deg);
          }
        }

        @keyframes tetromino4 {
          0%,
          60% {
            transform: translate(35px, 20px) rotateX(-36deg) rotateY(45deg);
          }
          90%,
          100% {
            transform: translate(0, 0) rotateX(-36deg) rotateY(45deg);
          }
        }
      `}</style>
    </>
  );
}
