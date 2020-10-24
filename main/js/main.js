window.onload = function main() {
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');
    const ratio = window.devicePixelRatio || 1;
    const width = innerWidth;
    const height = innerHeight;
    gl.canvas.width = width * ratio;
    gl.canvas.height = height * ratio;
    gl.canvas.style.width = width + 'px';
    gl.canvas.style.height = height + 'px';
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0.9, 0.9, 0.8, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}