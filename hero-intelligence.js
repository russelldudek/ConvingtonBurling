(() => {
  'use strict';

  const STAGES = {
    prototype: {
      index: 0,
      label: 'Matter prototype',
      intent: 'One bounded matter. Tight evidence boundary. Every consequential output stays under named human review.',
      accent: [0.258, 0.773, 0.961]
    },
    practice: {
      index: 1,
      label: 'Practice pattern',
      intent: 'Representative matters establish repeatability, eligibility rules, and legitimate practice exceptions.',
      accent: [0.180, 0.490, 0.969]
    },
    candidate: {
      index: 2,
      label: 'Cross-practice candidate',
      intent: 'A controlled transfer tests whether the reusable mechanics survive a different practice context.',
      accent: [0.553, 0.427, 1.000]
    },
    standard: {
      index: 3,
      label: 'Firm standard',
      intent: 'A maintained firm capability with lifecycle controls, local exception rights, and retirement evidence.',
      accent: [0.843, 0.686, 0.384]
    }
  };

  const SCENARIOS = { corporate: 0, litigation: 1, regulatory: 2, whitecollar: 3 };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function hash(value) {
    const x = Math.sin(value * 127.1 + 311.7) * 43758.5453123;
    return x - Math.floor(x);
  }

  function fibonacciDirection(index, count) {
    const y = 1 - (index / Math.max(1, count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = Math.PI * (3 - Math.sqrt(5)) * index;
    return [Math.cos(theta) * radius, y, Math.sin(theta) * radius];
  }

  function buildPositions(count) {
    const p0 = new Float32Array(count * 3);
    const p1 = new Float32Array(count * 3);
    const p2 = new Float32Array(count * 3);
    const p3 = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const seed = hash(i + 1);
      const seed2 = hash(i + 91);
      const seed3 = hash(i + 211);
      const [dx, dy, dz] = fibonacciDirection(i, count);
      seeds[i] = seed;

      if (i % 5 === 0) {
        const a = (i / count) * Math.PI * 16;
        const r = 0.72 + (seed - 0.5) * 0.08;
        p0[i * 3] = Math.cos(a) * r;
        p0[i * 3 + 1] = (seed2 - 0.5) * 0.11;
        p0[i * 3 + 2] = Math.sin(a) * r;
      } else {
        const r = 0.24 + seed * 0.34;
        p0[i * 3] = dx * r;
        p0[i * 3 + 1] = dy * r;
        p0[i * 3 + 2] = dz * r;
      }

      const bandY = Math.round(dy * 4) / 4;
      const shell = 0.84 + seed2 * 0.24;
      p1[i * 3] = dx * shell * (0.94 + seed * 0.12);
      p1[i * 3 + 1] = bandY * 0.92 + (seed3 - 0.5) * 0.045;
      p1[i * 3 + 2] = dz * shell;

      const left = i % 2 === 0;
      if (i % 7 === 0) {
        const t = (i % 97) / 96;
        p2[i * 3] = -0.78 + t * 1.56;
        p2[i * 3 + 1] = Math.sin(t * Math.PI * 3) * 0.08 + (seed - 0.5) * 0.04;
        p2[i * 3 + 2] = Math.cos(t * Math.PI * 2) * 0.12;
      } else {
        const r = 0.28 + seed * 0.34;
        p2[i * 3] = dx * r + (left ? -0.64 : 0.64);
        p2[i * 3 + 1] = dy * r * 1.08;
        p2[i * 3 + 2] = dz * r;
      }

      const major = 0.84 + (seed - 0.5) * 0.12;
      const minor = 0.22 + seed2 * 0.16;
      const a = (i / count) * Math.PI * 22;
      const b = Math.acos(Math.max(-1, Math.min(1, dy)));
      p3[i * 3] = (major + minor * Math.cos(b)) * Math.cos(a);
      p3[i * 3 + 1] = minor * Math.sin(b) * 1.8;
      p3[i * 3 + 2] = (major + minor * Math.cos(b)) * Math.sin(a);
    }

    return { p0, p1, p2, p3, seeds };
  }

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || 'Shader compilation failed');
    }
    return shader;
  }

  function program(gl, vertex, fragment) {
    const result = gl.createProgram();
    gl.attachShader(result, compile(gl, gl.VERTEX_SHADER, vertex));
    gl.attachShader(result, compile(gl, gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(result);
    if (!gl.getProgramParameter(result, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(result) || 'Program link failed');
    }
    return result;
  }

  function setupExperienceEntry() {
    const controls = document.querySelector('.lab-controls');
    const stageControls = controls?.querySelector('.stage-controls');
    const scenarioControls = controls?.querySelector('.scenario-controls');
    const treatmentGroup = stageControls?.closest('.control-group');
    const workflowGroup = scenarioControls?.closest('.control-group');

    if (controls && treatmentGroup && workflowGroup) {
      treatmentGroup.id = 'treatmentControls';
      treatmentGroup.classList.add('control-group-treatment');
      workflowGroup.classList.add('control-group-workflow');
      controls.insertBefore(treatmentGroup, workflowGroup);
    }

    const heading = document.querySelector('.lab-heading h2');
    if (heading) heading.textContent = 'Set the evidence treatment—then test where the workflow can travel.';
    const summary = document.querySelector('.lab-heading > p');
    if (summary) summary.textContent = 'Start with the evidence posture. The selected legal workflow remains visible context, while each treatment changes proof, authority, ownership, permission, and the next decision.';

    const reset = document.getElementById('resetLab');
    if (reset) {
      reset.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        window.__precedentEngine?.renderState({ scenario: 'corporate', stage: 'prototype', animate: true });
      }, true);
    }

    window.__precedentEngine?.renderState({ scenario: 'corporate', stage: 'prototype', animate: false });
  }

  function updateHeroCopy(stageKey) {
    const stage = STAGES[stageKey] || STAGES.prototype;
    const title = document.getElementById('heroTreatment');
    const intent = document.getElementById('heroTreatmentIntent');
    if (title) title.textContent = stage.label;
    if (intent) intent.textContent = stage.intent;
  }

  function startField() {
    const canvas = document.getElementById('intelligenceCanvas');
    const stageElement = document.getElementById('heroEngine');
    if (!canvas || !stageElement) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      depth: false,
      powerPreference: 'high-performance'
    });

    if (!gl) {
      stageElement.classList.add('no-webgl');
      return;
    }

    const vertex = `#version 300 es
      precision highp float;
      in vec3 aP0;
      in vec3 aP1;
      in vec3 aP2;
      in vec3 aP3;
      in float aSeed;
      uniform float uTime;
      uniform float uStage;
      uniform float uScenario;
      uniform float uAspect;
      uniform vec2 uPointer;
      uniform float uPointScale;
      uniform float uOffsetX;
      out float vSeed;
      out float vDepth;

      vec3 morphStage(float s) {
        if (s < 1.0) return mix(aP0, aP1, smoothstep(0.0, 1.0, s));
        if (s < 2.0) return mix(aP1, aP2, smoothstep(1.0, 2.0, s));
        return mix(aP2, aP3, smoothstep(2.0, 3.0, s));
      }

      mat3 rotateY(float a) {
        float c = cos(a); float s = sin(a);
        return mat3(c,0.0,-s, 0.0,1.0,0.0, s,0.0,c);
      }

      mat3 rotateX(float a) {
        float c = cos(a); float s = sin(a);
        return mat3(1.0,0.0,0.0, 0.0,c,s, 0.0,-s,c);
      }

      void main() {
        vec3 p = morphStage(uStage);
        float intelligence = sin(uTime * 0.22 + aSeed * 31.0) * 0.018;
        p += normalize(p + vec3(0.001)) * intelligence;
        p = rotateY(uTime * 0.018 + uScenario * 0.19 + uPointer.x * 0.09) * p;
        p = rotateX(-0.13 + uPointer.y * 0.06) * p;
        p.x += uPointer.x * (0.035 + max(0.0, p.z) * 0.018);
        p.y += uPointer.y * 0.025;

        float camera = 3.25;
        float depth = camera - p.z;
        vec2 projected = vec2(p.x / uAspect, p.y) * (2.45 / depth);
        projected.x += uOffsetX;
        gl_Position = vec4(projected, 0.0, 1.0);
        gl_PointSize = uPointScale * (1.5 + aSeed * 2.4) * (3.0 / depth);
        vSeed = aSeed;
        vDepth = clamp((p.z + 1.4) / 2.8, 0.0, 1.0);
      }
    `;

    const pointFragment = `#version 300 es
      precision highp float;
      uniform vec3 uAccent;
      in float vSeed;
      in float vDepth;
      out vec4 outColor;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float core = smoothstep(0.5, 0.0, d);
        float halo = smoothstep(0.5, 0.12, d) * 0.36;
        vec3 brass = vec3(0.90, 0.73, 0.42);
        vec3 color = mix(uAccent, brass, step(0.93, vSeed));
        float alpha = (core + halo) * mix(0.34, 0.96, vDepth);
        outColor = vec4(color, alpha);
      }
    `;

    const lineFragment = `#version 300 es
      precision highp float;
      uniform vec3 uAccent;
      in float vSeed;
      in float vDepth;
      out vec4 outColor;
      void main() {
        vec3 brass = vec3(0.90, 0.73, 0.42);
        vec3 color = mix(uAccent, brass, step(0.965, vSeed));
        outColor = vec4(color, mix(0.025, 0.15, vDepth));
      }
    `;

    const pointProgram = program(gl, vertex, pointFragment);
    const lineProgram = program(gl, vertex, lineFragment);
    const mobile = window.matchMedia('(max-width: 720px)').matches;
    const stacked = window.matchMedia('(max-width: 900px)').matches;
    const count = mobile ? 680 : 1380;
    const positions = buildPositions(count);

    function makeBuffer(data) {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return buffer;
    }

    const pointBuffers = {
      aP0: makeBuffer(positions.p0),
      aP1: makeBuffer(positions.p1),
      aP2: makeBuffer(positions.p2),
      aP3: makeBuffer(positions.p3),
      aSeed: makeBuffer(positions.seeds)
    };

    const lineCount = Math.min(mobile ? 190 : 420, Math.floor(count / 3));
    const lineData = { p0: [], p1: [], p2: [], p3: [], seeds: [] };
    for (let i = 0; i < lineCount; i += 1) {
      const a = (i * 17) % count;
      const b = (a + 13 + (i % 11)) % count;
      for (const key of ['p0', 'p1', 'p2', 'p3']) {
        const src = positions[key];
        lineData[key].push(src[a * 3], src[a * 3 + 1], src[a * 3 + 2]);
        lineData[key].push(src[b * 3], src[b * 3 + 1], src[b * 3 + 2]);
      }
      lineData.seeds.push(positions.seeds[a], positions.seeds[b]);
    }

    const lineBuffers = {
      aP0: makeBuffer(new Float32Array(lineData.p0)),
      aP1: makeBuffer(new Float32Array(lineData.p1)),
      aP2: makeBuffer(new Float32Array(lineData.p2)),
      aP3: makeBuffer(new Float32Array(lineData.p3)),
      aSeed: makeBuffer(new Float32Array(lineData.seeds))
    };

    function bindAttributes(activeProgram, buffers) {
      for (const name of ['aP0', 'aP1', 'aP2', 'aP3']) {
        const location = gl.getAttribLocation(activeProgram, name);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers[name]);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
      }
      const seedLocation = gl.getAttribLocation(activeProgram, 'aSeed');
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.aSeed);
      gl.enableVertexAttribArray(seedLocation);
      gl.vertexAttribPointer(seedLocation, 1, gl.FLOAT, false, 0, 0);
    }

    let stage = 0;
    let targetStage = 0;
    let scenario = 0;
    let targetScenario = 0;
    let accent = [...STAGES.prototype.accent];
    let targetAccent = [...accent];
    let pointer = { x: 0, y: 0 };
    let targetPointer = { x: 0, y: 0 };
    let visible = true;
    let frame = 0;

    function syncState() {
      const key = document.body.dataset.treatment || 'prototype';
      const state = STAGES[key] || STAGES.prototype;
      targetStage = state.index;
      targetAccent = [...state.accent];
      const current = window.__precedentEngine?.getState?.();
      targetScenario = SCENARIOS[current?.scenario] || 0;
      stageElement.dataset.intelligenceMode = key;
      updateHeroCopy(key);
    }

    new MutationObserver(syncState).observe(document.body, { attributes: true, attributeFilter: ['data-treatment'] });
    document.querySelectorAll('.scenario-btn').forEach((button) => button.addEventListener('click', () => {
      targetScenario = SCENARIOS[button.dataset.scenario] || 0;
    }));

    const hero = document.querySelector('.hero-intelligence');
    hero?.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      targetPointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPointer.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    }, { passive: true });
    hero?.addEventListener('pointerleave', () => {
      targetPointer.x = 0;
      targetPointer.y = 0;
    });

    new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible && !reduceMotion.matches && !frame) frame = requestAnimationFrame(render);
    }, { threshold: 0.02 }).observe(hero || canvas);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.75);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      return { aspect: width / height, dpr };
    }

    function setUniforms(activeProgram, time, aspect, dpr) {
      gl.uniform1f(gl.getUniformLocation(activeProgram, 'uTime'), time);
      gl.uniform1f(gl.getUniformLocation(activeProgram, 'uStage'), stage);
      gl.uniform1f(gl.getUniformLocation(activeProgram, 'uScenario'), scenario);
      gl.uniform1f(gl.getUniformLocation(activeProgram, 'uAspect'), aspect);
      gl.uniform2f(gl.getUniformLocation(activeProgram, 'uPointer'), pointer.x, pointer.y);
      gl.uniform1f(gl.getUniformLocation(activeProgram, 'uPointScale'), dpr * (mobile ? 2.3 : 2.7));
      gl.uniform1f(gl.getUniformLocation(activeProgram, 'uOffsetX'), stacked ? 0.0 : 0.34);
      gl.uniform3f(gl.getUniformLocation(activeProgram, 'uAccent'), accent[0], accent[1], accent[2]);
    }

    function draw(timeSeconds) {
      const { aspect, dpr } = resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      gl.useProgram(lineProgram);
      bindAttributes(lineProgram, lineBuffers);
      setUniforms(lineProgram, timeSeconds, aspect, dpr);
      gl.drawArrays(gl.LINES, 0, lineCount * 2);

      gl.useProgram(pointProgram);
      bindAttributes(pointProgram, pointBuffers);
      setUniforms(pointProgram, timeSeconds, aspect, dpr);
      gl.drawArrays(gl.POINTS, 0, count);
    }

    function render(timestamp) {
      frame = 0;
      stage += (targetStage - stage) * 0.045;
      scenario += (targetScenario - scenario) * 0.035;
      pointer.x += (targetPointer.x - pointer.x) * 0.04;
      pointer.y += (targetPointer.y - pointer.y) * 0.04;
      for (let i = 0; i < 3; i += 1) accent[i] += (targetAccent[i] - accent[i]) * 0.05;
      draw(timestamp * 0.001);
      if (visible && !reduceMotion.matches) frame = requestAnimationFrame(render);
    }

    function settleReducedMotion() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      stage = targetStage;
      scenario = targetScenario;
      accent = [...targetAccent];
      pointer = { x: 0, y: 0 };
      draw(0);
    }

    reduceMotion.addEventListener('change', () => {
      if (reduceMotion.matches) settleReducedMotion();
      else if (visible && !frame) frame = requestAnimationFrame(render);
    });
    window.addEventListener('resize', () => draw(performance.now() * 0.001), { passive: true });

    syncState();
    if (reduceMotion.matches) settleReducedMotion();
    else frame = requestAnimationFrame(render);
  }

  setupExperienceEntry();
  startField();
})();
