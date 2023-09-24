const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = canvas.width,
    H = canvas.height,
    CENTER = W / 2;
const rowsIn = document.getElementById("rowsIn");
const cols = ["#DD0", "#0A0"];

rowsIn.addEventListener("input", draw);
draw();

function fillPath(path, x, y, color) {
    ctx.fillStyle = color;
    ctx.setTransform(1, 0, 0, 1, x, y);
    ctx.fill(path);
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const S = Number(rowsIn.value);
    const ss = S * S - 2 * S + 1;
    const a = 4 / ss - 3,
        b = -4 * H / ss,
        c = H * H / ss;
    const R = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a); // the radius
    const TOP = R;
    const D = Math.sqrt((R * 2) ** 2 - R ** 2);
    const circle = new Path2D();
    circle.arc(0, 0, R, 0, Math.PI * 2);
    let y = 0,
        x;
    while (y < S) {
        x = 0;
        const LEFT = CENTER - y * R;
        while (x <= y) {
            fillPath(circle, LEFT + x++ * R * 2, TOP + y * D, cols[y % 2]);
        }
        y++;
    }
}