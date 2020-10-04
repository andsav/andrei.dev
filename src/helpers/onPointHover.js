export default {
  darkMode: (ctx, point) => {
    ctx.fillStyle = "#20457c";
    ctx.beginPath();
    ctx.moveTo(point.x - 26, point.y);
    ctx.lineTo(point.x, point.y - 15);
    ctx.lineTo(point.x + 26, point.y);
    ctx.lineTo(point.x, point.y + 15);
    ctx.closePath();
    ctx.fill();
  },
  lightMode: (ctx, { x, y }) => {
    ctx.fillStyle = "#fefdfb";
    ctx.beginPath();
    ctx.moveTo(x[0], y[0]);
    ctx.lineTo(x[1], y[1]);
    ctx.lineTo(x[2], y[2]);
    ctx.closePath();
    ctx.fill();
  },
};
