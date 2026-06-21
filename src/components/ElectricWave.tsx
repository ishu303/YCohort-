import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform float u_time;
uniform vec2 u_res;
uniform float u_waveSpeed;

#define PI 3.14159265359

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash1(float n) {
  return fract(sin(n) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float electricWave(vec2 uv, float freq, float amp, float speed, float thickness, float t) {
  float x = uv.x * freq;
  float y = uv.y + sin(x + t * speed) * amp;
  y += sin(x * 2.3 + t * speed * 1.1) * amp * 0.5;
  y += sin(x * 4.7 - t * speed * 0.7) * amp * 0.25;
  return smoothstep(thickness, 0.0, abs(y));
}

float electricWave2(vec2 uv, float freq, float amp, float speed, float thickness, float t) {
  float x = uv.x * freq;
  float wave = sin(x + t * speed) * amp;
  wave += sin(x * 3.1 + t * speed * 0.8) * amp * 0.4;
  wave += sin(x * 7.3 - t * speed * 1.2) * amp * 0.15;
  float y = uv.y + wave;
  return smoothstep(thickness, 0.0, abs(y));
}

vec3 mainWaveColor(float x, float t) {
  return vec3(0.23, 0.42, 1.0) + vec3(0.15, 0.1, 0.3) * sin(x * 3.0 + t * 0.2 + vec3(0.0, 2.0, 4.0));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
  float t = u_time;
  float waveSpeed = u_waveSpeed;

  vec3 col = vec3(0.04, 0.05, 0.1);

  float sparkle = 0.0;
  for (int i = 0; i < 12; i++) {
    float fi = float(i);
    vec2 sp = vec2(hash1(fi * 73.1 + 10.0) * 2.4 - 1.2, hash1(fi * 127.3 + 20.0) * 1.6 - 0.8);
    float phase = hash1(fi * 231.7 + 30.0) * 6.28;
    float speed = 0.5 + hash1(fi * 347.1 + 40.0) * 2.0;
    float scale = 0.3 + hash1(fi * 91.5 + 50.0) * 0.7;
    float flash = pow(max(sin(t * speed + phase), 0.0), 16.0);
    float dist = length(uv - sp);
    sparkle += flash * smoothstep(0.05 * scale, 0.0, dist);
  }
  col += sparkle * 0.8;

  // Upper branch
  vec2 u1 = uv - vec2(0.0, 0.1);
  float w1 = electricWave(u1, 4.0, 0.15, waveSpeed * 1.5, 0.025, t);
  vec3 c1 = mainWaveColor(u1.x, t);
  float n1 = noise(vec2(u1.x * 3.0, t * 0.3)) * 0.5 + 0.5;
  float intensity1 = 0.6 + n1 * 0.4;
  float glow1 = electricWave(u1, 4.0, 0.15, waveSpeed * 1.5, 0.08, t);
  col += c1 * glow1 * 0.35 * intensity1;
  col += c1 * w1 * 0.9 * intensity1;

  // Lower branch
  vec2 u2 = uv + vec2(0.0, 0.1);
  float w2 = electricWave2(u2, 5.0, 0.1, waveSpeed * 1.8, 0.02, t);
  vec3 c2 = mainWaveColor(u2.x + 2.0, t + 1.0);
  float n2 = noise(vec2(u2.x * 4.0 + 10.0, t * 0.4)) * 0.5 + 0.5;
  float intensity2 = 0.5 + n2 * 0.5;
  float glow2 = electricWave2(u2, 5.0, 0.1, waveSpeed * 1.8, 0.07, t);
  col += c2 * glow2 * 0.3 * intensity2;
  col += c2 * w2 * 0.85 * intensity2;

  // Branch cross-glow
  float crossSection = smoothstep(0.5, 0.0, length(uv));
  col += vec3(0.23, 0.42, 1.0) * crossSection * 0.25 * (0.5 + 0.5 * sin(t * 0.3));

  // Pulsing beam
  float pulseX = sin(t * waveSpeed * 0.5) * 0.6;
  float beamDist = length(vec2(uv.x - pulseX, 0.0));
  float beam = smoothstep(0.2, 0.0, beamDist);
  col += vec3(0.4, 0.6, 1.0) * beam * 0.12 * (0.5 + 0.5 * sin(t * 0.8));

  // Ambient glow
  float ambient = smoothstep(1.0, 0.0, length(uv));
  col += vec3(0.05, 0.1, 0.3) * ambient * 0.15;

  // Vignette
  col *= smoothstep(1.2, 0.3, length(uv * vec2(0.8, 1.0)));

  gl_FragColor = vec4(pow(col, vec3(0.95)), 1.0);
}
`;

export default function ElectricWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    // Compile shader
    function compileShader(src: string, type: number) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(VERTEX_SHADER, gl.VERTEX_SHADER);
    const fs = compileShader(FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Full-screen triangle
    const verts = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uWaveSpeed = gl.getUniformLocation(program, "u_waveSpeed");

    gl.uniform1f(uWaveSpeed, 1.0);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
    }

    resize();
    window.addEventListener("resize", resize);

    let rafId: number;
    function render() {
      gl!.uniform1f(uTime, performance.now() * 0.001);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      rafId = requestAnimationFrame(render);
    }
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}
