import React from "react";
import Particles from "react-tsparticles";

const ParticleBackground = () => {
  return (
    <Particles
      className="absolute top-0 left-0 w-full h-full z-0"
      options={{
        background: { color: "#000" },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: "#ff004f" },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 4 } },
          move: { enable: true, speed: 1.5, outModes: "bounce" },
          links: { enable: true, distance: 150, color: "#ff004f", opacity: 0.3 },
        },
      }}
    />
  );
};

export default ParticleBackground;
