export default function getAnimation(index) {
  const animations = {
    2: "fade-down",
    3: "fade-left",
    5: "fade-up",
    6: "fade-left",
  };

  return animations[index + 1] || "fade-right";
}
