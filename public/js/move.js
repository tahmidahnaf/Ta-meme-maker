let move = (target , extras) => {
  // declarations

  const doneButton = document.querySelector(".done");
  let theme = '#00b894'

  // A moveable library that can move the upper and lower texts

  //Configuration

  const moveable = new Moveable(document.body, {
    target: target,
    warpable: false,
    draggable: false,
    rotatable: false,
    keepRatio: false,
    throttleResize: 0,
    throttleDrag: 0,
    throttleRotate: 0,
    rotationPosition: "top",
    renderDirections: ["nw", "n", "ne", "w", "e", "sw", "s", "se"],
    edge: false,
    zoom: 1,
    origin: true,
    padding: { left: 0, top: 0, right: 0, bottom: 0 },
  });

  // Initial state of frame

  let frame = {
    translate: [0, 0],
    rotate: 0,
    matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  };

  // event handling

  moveable
    .on("warpStart", (e) => {
      e.set(frame.matrix);
    })
    .on("warp", (e) => {
      frame.matrix = e.matrix;
    })
    .on("dragStart", (e) => {
      e.set(frame.translate);
    })
    .on("drag", (e) => {
      frame.translate = e.beforeTranslate;
    })
    .on("rotateStart", (e) => {
      e.set(frame.rotate);
    })
    .on("rotate", (e) => {
      frame.rotate = e.beforeRotate;
    })
    .on("render", (e) => {
      const { translate, rotate, matrix } = frame;
      e.target.style.transform = `translate(${translate[0]}px, ${translate[1]
        }px) rotate(${rotate}deg) matrix3d(${matrix.join(",")})`;
    });


  // controlBox is defined at the end of the script coz it is a part of the external library that is loaded first and we can't access on the controlBox before the loading of controlBox.

  const controlBoxes = document.querySelectorAll('.moveable-control-box')

  controlBoxes.forEach(controlBox => {
    window.addEventListener('load', () => {
      controlBox.style.setProperty('--moveable-color', theme)
    })
  
    target.addEventListener("click", () => {
      moveable.draggable = true;
      moveable.warpable = true;
      moveable.rotatable = true;
      doneButton.style.display = "block"
      controlBox.style.setProperty('--moveable-color', theme)
      extras()
    });
  
    doneButton.addEventListener('click', () => {
      moveable.draggable = false;
      moveable.warpable = false;
      moveable.rotatable = false;
      doneButton.style.display = "none"
      controlBox.style.setProperty('--moveable-color', 'transparent')
    })
  })


}