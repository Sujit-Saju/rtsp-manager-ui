/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export default function BackgroundShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = v_texCoord;
        
        // Subtle grid pattern
        vec2 gridUv = fract(uv * 40.0);
        float grid = smoothstep(0.012, 0.0, gridUv.x) + smoothstep(0.012, 0.0, gridUv.y);
        grid *= 0.12;

        // Moving scanline
        float scanline = sin(uv.y * 140.0 + u_time * 1.8) * 0.008;
        
        // Vignette
        float vignette = 1.0 - length(uv - 0.5) * 0.65;
        
        // Deep industrial carbon background
        vec3 color = vec3(0.045, 0.04, 0.04);
        
        // Glowing space neon auras (Amber & Warm Orange)
        float glow1 = sin(uv.x * 1.2 + u_time * 0.2) * cos(uv.y * 1.2 - u_time * 0.15) * 0.5 + 0.5;
        float glow2 = cos(uv.x * 2.0 - u_time * 0.28) * sin(uv.y * 2.0 + u_time * 0.25) * 0.5 + 0.5;
        
        color += vec3(0.85, 0.45, 0.05) * glow1 * 0.05;
        color += vec3(0.9, 0.2, 0.02) * glow2 * 0.04;
        
        color += grid * 0.35;
        color += scanline;
        color *= max(vignette, 0.75);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl!.getShaderInfoLog(s));
        gl!.deleteShader(s);
        return null;
      }
      return s;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program linking error');
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    let animationId: number;
    let width = 0;
    let height = 0;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width || canvas.clientWidth || 1280;
        height = entry.contentRect.height || canvas.clientHeight || 720;
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    });
    resizeObserver.observe(canvas);

    const render = (t: number) => {
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      id="bg-shader-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-1] opacity-100 pointer-events-none bg-[#070a13]"
      style={{ display: 'block' }}
    />
  );
}
