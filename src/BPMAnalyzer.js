export class BPMAnalyzer {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 512;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.buffer = [];
    this.lastPeakTime = 0;
  }

  connect(audioSource) {
    audioSource.connect(this.analyser);
  }

  detectBPM(callback) {
    const process = () => {
      this.analyser.getByteFrequencyData(this.dataArray);
      const volume = this.dataArray.reduce((a, b) => a + b, 0) / this.dataArray.length;
      const now = this.audioContext.currentTime;
      
      if (volume > 150) {
        if (now - this.lastPeakTime > 0.3) {
          this.buffer.push(now - this.lastPeakTime);
          this.lastPeakTime = now;
        }
      }
      
      if (this.buffer.length > 10) {
        const avgInterval = this.buffer.reduce((a, b) => a + b, 0) / this.buffer.length;
        const bpm = Math.round(60 / avgInterval);
        callback(bpm);
        this.buffer = [];
      }
      requestAnimationFrame(process);
    };
    process();
  }
}
