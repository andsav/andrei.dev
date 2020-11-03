export default {
  darkMode: (mouseX, mouseY) => {
    const cX = ~~(mouseX / 54) * 54 + 26;
    const cY = ~~(mouseY / 58) * 58 + 29;

    return [
      [cX, cY],
      [cX - 27, cY - 29],
      [cX - 27, cY + 29],
      [cX + 27, cY - 29],
      [cX + 27, cY + 29],
    ]
      .map(([x, y]) => ({
        x,
        y,
        d: Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2),
      }))
      .sort((a, b) => a.d - b.d)[0];
  },
  lightMode: (mouseX, mouseY) => {
    const cX = 16 + ~~(mouseX / 47) * 47;
    const cY = 12 + ~~(mouseY / 30) * 30;

    let triangles = [
      [
        [cX - 25, cY],
        [cX, cY - 15],
        [cX, cY + 15],
      ],
      [
        [cX, cY - 15],
        [cX + 25, cY],
        [cX, cY + 15],
      ],
    ];
    triangles = triangles.concat(
      triangles.map((points) => points.map(([x, y]) => [x, y - 30])),
      triangles.map((points) => points.map(([x, y]) => [x, y + 30])),
      triangles.map((points) => points.map(([x, y]) => [x - 25, y + 15])),
      triangles.map((points) => points.map(([x, y]) => [x - 25, y - 15])),
      triangles.map((points) => points.map(([x, y]) => [x + 25, y + 15])),
      triangles.map((points) => points.map(([x, y]) => [x + 25, y - 15]))
    );

    const triangle = triangles[~~(Math.random() * triangles.length)];

    return {
      x: triangle.map(([x, _]) => x),
      y: triangle.map(([_, y]) => y),
    };
  },
};
