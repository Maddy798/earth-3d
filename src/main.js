import { Application } from "@splinetool/runtime";

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 500);
});

gsap.ticker.lagSmoothing(0);

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
app
  .load("https://prod.spline.design/nMomFpniuvFQSIFS/scene.splinecode")
  .then(() => {
    const earth = app.findObjectByName("untitled");

    gsap.set(earth.scale, { x: 40, y: 40, z: 40 });
    gsap.set(earth.position, { x: 200, y: -2250 });

    let rotateKeyboard = gsap.to(earth.rotation, {
      y: Math.PI * 2 + earth.rotation.y,
      x: 0,
      z: 0,
      duration: 10,
      repeat: -1,
      ease: "none",
    });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "1% 0%",
        end: "100% 100%",
        scrub: true,
        markers: false,
      },
    });

    tl.to(
      earth.position,
      {
        x: 0,
        y: 0,
        z: 1800,
      },
      "scroll"
    );

    tl.to(
      earth.scale,
      {
        x: 20,
        y: 20,
        z: 20,
      },
      "scroll"
    );
  });
