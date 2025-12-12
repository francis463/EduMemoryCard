// Sound utility for card flipping
let flipSound: HTMLAudioElement | null = null;

// Initialize the flip sound using Web Audio API to generate a simple sound
const initFlipSound = () => {
  if (flipSound) return flipSound;

  // Create an audio context
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Create a simple "flip" sound effect
  const duration = 0.15; // 150ms
  const sampleRate = audioContext.sampleRate;
  const numSamples = duration * sampleRate;
  const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
  const data = buffer.getChannelData(0);
  
  // Generate a quick ascending chirp sound
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const frequency = 400 + (t * 600); // Sweep from 400Hz to 1000Hz
    const envelope = Math.exp(-t * 15); // Quick decay
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
  }
  
  // Convert buffer to audio element for easy playback
  const offlineContext = new OfflineAudioContext(1, numSamples, sampleRate);
  const source = offlineContext.createBufferSource();
  source.buffer = buffer;
  source.connect(offlineContext.destination);
  source.start(0);
  
  offlineContext.startRendering().then((renderedBuffer) => {
    // Convert to WAV blob
    const wav = audioBufferToWav(renderedBuffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    flipSound = new Audio(url);
    flipSound.volume = 0.3;
  });
  
  return flipSound;
};

// Convert AudioBuffer to WAV format
function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const length = buffer.length * buffer.numberOfChannels * 2;
  const arrayBuffer = new ArrayBuffer(44 + length);
  const view = new DataView(arrayBuffer);
  const channels = [];
  let offset = 0;
  let pos = 0;

  // Write WAV header
  const setUint16 = (data: number) => {
    view.setUint16(pos, data, true);
    pos += 2;
  };
  const setUint32 = (data: number) => {
    view.setUint32(pos, data, true);
    pos += 4;
  };

  // "RIFF" chunk descriptor
  setUint32(0x46464952); // "RIFF"
  setUint32(36 + length); // file length - 8
  setUint32(0x45564157); // "WAVE"

  // "fmt " sub-chunk
  setUint32(0x20746d66); // "fmt "
  setUint32(16); // subchunk size
  setUint16(1); // audio format (1 = PCM)
  setUint16(buffer.numberOfChannels);
  setUint32(buffer.sampleRate);
  setUint32(buffer.sampleRate * 2 * buffer.numberOfChannels); // byte rate
  setUint16(buffer.numberOfChannels * 2); // block align
  setUint16(16); // bits per sample

  // "data" sub-chunk
  setUint32(0x61746164); // "data"
  setUint32(length);

  // Write interleaved data
  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (pos < arrayBuffer.byteLength) {
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      let sample = channels[i][offset];
      sample = Math.max(-1, Math.min(1, sample));
      view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      pos += 2;
    }
    offset++;
  }

  return arrayBuffer;
}

export const playFlipSound = () => {
  try {
    if (!flipSound) {
      initFlipSound();
    }
    
    if (flipSound && flipSound.readyState >= 2) {
      // Clone and play to allow overlapping sounds
      const sound = flipSound.cloneNode() as HTMLAudioElement;
      sound.volume = 0.3;
      sound.play().catch(() => {
        // Silently fail if sound doesn't play (e.g., user hasn't interacted yet)
      });
    }
  } catch (error) {
    // Silently fail - sound is optional
    console.log('Could not play flip sound:', error);
  }
};

// Initialize on first user interaction
export const initSound = () => {
  initFlipSound();
};
