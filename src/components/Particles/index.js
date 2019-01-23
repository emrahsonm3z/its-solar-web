import React from "react";
import Particles from "react-particles-js";

class Paricle extends React.Component {
  render() {
    return (
      <div id="particles-js">
        <Particles
          params={{
            particles: {
              number: {
                value: 135, //180,
                density: {
                  enable: false,
                  value_area: 800
                }
              },
              color: {
                value: "#00ff00"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 2,
                  color: "#007000"
                }
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 0.1, //1.3,
                random: true,
                anim: {
                  enable: false, //true,
                  speed: 1,
                  size_min: 0,
                  sync: true
                }
              },
              line_linked: {
                enable: true,
                distance: 120,
                color: "#32cd32",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "bounce", // bounce on edges of canvas
                bounce: true, // bounce between particles
                attract: {
                  enable: false
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: ["grab", "bubble"]
                },
                onclick: {
                  enable: false, //true,
                  mode: "bubble"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 183,
                  line_linked: {
                    opacity: 0.83
                  }
                },
                bubble: {
                  distance: 183,
                  size: 2.7,
                  duration: 0.5,
                  opacity: 0.4,
                  speed: 3
                },
                repulse: {
                  distance: 200,
                  duration: 0.5
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
            retina_detect: true
          }}
        />
      </div>
    );
  }
}

export default Paricle;
