 Music Visualizer — Real-time Audio-Reactive WebGL

프로젝트 개요

이 프로젝트는 사용자가 업로드한 음악을 실시간으로 분석하고, 해당 음악의 주파수 데이터에 따라 3D 오브젝트를 동적으로 변형시키는 음악 시각화 웹앱입니다.
WebGL 기반인 Three.js와 GLSL 쉐이더를 활용하여, 노이즈 기반 애니메이션과 컬러 변화를 통해 생동감 있는 시각효과를 구현했습니다.

핵심 아이디어:
“음악을 귀로 듣는 것이 아니라 눈으로 느낄 수 있도록 만든다.”

⸻

주요 기능
	•	음악 업로드 후 실시간 주파수 분석
	• 오디오 주파수 세기에 따라 3D 오브젝트 변형
	•	Perlin Noise 기반 자연스러운 Geometry 왜곡
	•	Bloom 효과로 발광 효과 구현
	•	GLSL 커스텀 쉐이더 기반 시각화
	•	마우스에 반응하는 인터랙션

⸻

Perlin Noise란?

이 프로젝트의 정점 쉐이더는 Perlin Noise를 기반으로 3D 도형을 부드럽고 유기적으로 변형시킵니다.

Perlin Noise란?

Perlin Noise는 자연 현상처럼 부드럽고 연속적인 패턴을 생성하는 알고리즘으로, 클라우드, 물결, 연기, 지형 등 시뮬레이션에 자주 사용됩니다.

프로젝트에서의 활용
	•	position + u_time을 입력으로 사용하여 시간에 따라 변하는 노이즈 생성
	•	normal 방향으로 displacement를 적용하여 도형이 살아 움직이듯 변형
	•	음악의 u_frequency 값에 비례해 변형 강도 조절

float noise = 5.0 * pnoise(position + u_time, vec3(10.0));
float displacement = (u_frequency / 30.0) * (noise / 10.0);
vec3 newPosition = position + normal * displacement;


⸻

시각화 구조

Audio Input
   ↓
Web Audio API → 주파수 분석 (Analyser)
   ↓
Three.js Scene + Camera + Renderer
   ↓
GLSL Shader (Vertex: deformation, Fragment: color)
   ↓
UnrealBloomPass → Glow Effect


⸻

기술 스택
	•	Three.js
	•	GLSL (Vertex & Fragment Shader)
	•	Web Audio API
	•	JavaScript / HTML / CSS
	•	Perlin Noise Implementation in GLSL



⸻

향후 개선 방향
	•	BPM 기반 pulsation 구현
	•	색상 변화 그라데이션 적용
	•	실시간 마이크 입력 분석 기능 추가
	•	사용자 제어 가능한 UI 버튼 (재생/정지)

⸻

미리보기

음악이 강할수록 도형이 요동치며, 색상도 생동감 있게 변화합니다.


⸻

참고 자료
	•	Perlin Noise by Ken Perlin
	•	Three.js Docs
	•	GLSL Noise Functions

⸻

만든이

Junpyo (준표)
Ajou University
📫 [your-email@example.com]
🌐 [your-portfolio.com]

⸻
