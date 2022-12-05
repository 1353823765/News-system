import { loadSnowPreset } from "tsparticles-preset-snow";
export  const options = {
    preset: "snow",
    "background": {
              "color": {
                  "value": "rgb(35,39,65)"
              }},
    particles: {
      move: {
        speed: 1,
      },
      opacity: {
        value: 0.7,
      },
      size: {
        value: { min: 10, max:5 },
      },
    },
  };
 export const customInit = async (engine) => {
    await loadSnowPreset(engine);
  };