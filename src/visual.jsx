import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const MusicVisualizer = () => {
  const containerRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -2, 14);
    camera.lookAt(0, 0, 0);

    const divcontainer = containerRef.current;
    divcontainer.appendChild(renderer.domElement);

    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    const musicUpload = document.getElementById('musicUpload');

    musicUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        document.querySelector('.container').style.display = "none";
        const fileURL = URL.createObjectURL(file);

        audioLoader.load(fileURL, (buffer) => {
          divcontainer.style.display = "inline";
          sound.setBuffer(buffer);
          sound.play();
        });
      }
    });

    const params = { threshold: 0.5, strength: 0.5, radius: 0.8 };
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight));
    bloomPass.threshold = params.threshold;
    bloomPass.strength = params.strength;
    bloomPass.radius = params.radius;
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    bloomComposer.addPass(new OutputPass());

    const uniforms = {
      u_time: { value: 0.0 },
      u_frequency: { value: 0.0 },
      u_red: { value: 1.0 },
      u_green: { value: 1.0 },
      u_blue: { value: 1.0 }
    };

    const mat = new THREE.ShaderMaterial({
      wireframe: true,
      uniforms,
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent
    });

    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(4, 40), mat);
    scene.add(mesh);

    const analyser = new THREE.AudioAnalyser(sound, 32);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    });

    const clock = new THREE.Clock();
    function animate() {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.5;
      camera.lookAt(scene.position);

      const freqValue = analyser.getAverageFrequency() / 256;
      uniforms.u_red.value = 1.0 - freqValue;
      uniforms.u_green.value = freqValue;
      uniforms.u_blue.value = Math.sin(freqValue * Math.PI);

      uniforms.u_time.value = clock.getElapsedTime();
      uniforms.u_frequency.value = analyser.getAverageFrequency();

      bloomPass.strength = Math.min(analyser.getAverageFrequency() / 512, 1);

      bloomComposer.render();
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      bloomComposer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      if (divcontainer && renderer.domElement && divcontainer.contains(renderer.domElement)) {
        divcontainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div>
      <div className="container">
        <div className='container-children'>
          <h1>Music Visualizer</h1>
          <label htmlFor="musicUpload" className="upload-btn">upload file
          </label>
          <input type="file" id="musicUpload" accept="audio/*" />
        </div>
      </div>
      <div className='visualizer-container'>
        <div className="visualizer" ref={containerRef}></div>
        <div className='side'></div>
      </div>
    </div>
  );
};

export default MusicVisualizer;