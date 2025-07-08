# Music Visualizer — Real-time Audio-Reactive WebGL

이 프로젝트는 Three.js, GLSL, Web Audio API를 기반으로 제작된 실시간 음악 시각화 웹앱입니다.  
사용자가 업로드한 음악을 실시간으로 분석하고, 주파수 세기에 따라 3D 오브젝트를 동적으로 변형시킵니다.  
Perlin Noise 기반의 애니메이션과 Bloom 효과를 통해 몰입감 있는 시청각 경험을 제공합니다.

<img width="w-full" alt="스크린샷 2025-07-08 오후 9 23 00" src="https://github.com/user-attachments/assets/9b66cc79-4b21-43d7-800d-74f91a1a757d" />

[데모 링크](https://junpyo0508.github.io/MusicVisualizer/)  

---

## 프로젝트 개요

- 음악 업로드 후 실시간 주파수 분석
- 오디오 주파수 세기에 따라 3D 오브젝트 변형
- Perlin Noise 기반 자연스러운 Geometry 왜곡
- Bloom 효과로 발광 효과 구현
- GLSL 커스텀 쉐이더 기반 시각화
- 마우스에 반응하는 인터랙션 (회전, 이동 등)

---

## Perlin Noise란?

Perlin Noise는 자연스럽고 연속적인 무작위 패턴을 생성하는 알고리즘입니다.  
구름, 물결, 연기, 지형 시뮬레이션 등에 자주 사용되며, 이 프로젝트의 핵심 요소입니다.

### 프로젝트에서의 활용 방식

- position + u_time 값을 입력으로 사용해 시간에 따라 움직이는 노이즈 생성
- normal 방향으로 displacement를 적용해 도형 변형
- u_frequency 값(주파수 세기)에 비례해 변형 강도 조절

### GLSL 정점 쉐이더 코드 예시

```glsl
float noise = 5.0 * pnoise(position + u_time, vec3(10.0));
float displacement = (u_frequency / 30.0) * (noise / 10.0);
vec3 newPosition = position + normal * displacement;
```
## 기술 스택

| 기술 | 설명 |
|------|------|
| [Three.js](https://threejs.org/) | WebGL 기반 3D 렌더링 라이브러리 |
| GLSL (Vertex & Fragment Shader) | GPU에서 실행되는 셰이더 언어 |
| [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | 브라우저에서 오디오 분석 처리 |
| JavaScript / HTML / CSS | 프론트엔드 개발 언어 |
| Perlin Noise (GLSL 구현) | 자연스러운 패턴 생성 알고리즘 |

---

## 참고 자료

- [Perlin Noise by Ken Perlin](https://mrl.cs.nyu.edu/~perlin/noise/)
- [Three.js 공식 문서](https://threejs.org/docs/)
- [The Book of Shaders – Noise Functions](https://thebookofshaders.com/13/)

---

## 만든이

| 이름 | 소속 | 연락처 | 포트폴리오 |
|------|------|--------|-------------|
| **HongJunpyo (홍준표)** | Ajou University | 📫 junpyo508@ajou.ac.kr |
