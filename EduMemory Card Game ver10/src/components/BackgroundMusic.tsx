import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

export function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const hasInteractedRef = useRef(false);
  const loopTimeoutRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  // Musical notes for a simple, pleasant melody (C major scale)
  const melody = [
    { freq: 523.25, duration: 0.5 }, // C5
    { freq: 587.33, duration: 0.5 }, // D5
    { freq: 659.25, duration: 0.5 }, // E5
    { freq: 523.25, duration: 0.5 }, // C5
    { freq: 587.33, duration: 0.5 }, // D5
    { freq: 659.25, duration: 1.0 }, // E5
    { freq: 698.46, duration: 0.5 }, // F5
    { freq: 783.99, duration: 1.5 }, // G5
  ];

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = 0.3; // Set volume to 30% for background music
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }

    // Resume audio context if suspended
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playMelody = () => {
    if (!audioContextRef.current || !gainNodeRef.current || !isPlayingRef.current) return;

    const audioContext = audioContextRef.current;
    const gainNode = gainNodeRef.current;
    let currentTime = audioContext.currentTime;

    const playLoop = () => {
      // Check if still playing using ref
      if (!isPlayingRef.current) {
        return;
      }

      // Clear previous oscillators
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Ignore if already stopped
        }
      });
      oscillatorsRef.current = [];

      melody.forEach((note) => {
        const oscillator = audioContext.createOscillator();
        const noteGain = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = note.freq;
        
        // Envelope for smooth note transitions
        noteGain.gain.setValueAtTime(0, currentTime);
        noteGain.gain.linearRampToValueAtTime(0.1, currentTime + 0.05);
        noteGain.gain.linearRampToValueAtTime(0.05, currentTime + note.duration - 0.05);
        noteGain.gain.linearRampToValueAtTime(0, currentTime + note.duration);

        oscillator.connect(noteGain);
        noteGain.connect(gainNode);

        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);

        oscillatorsRef.current.push(oscillator);
        currentTime += note.duration;
      });

      // Schedule next loop
      const totalDuration = melody.reduce((sum, note) => sum + note.duration, 0);
      loopTimeoutRef.current = window.setTimeout(() => {
        if (isPlayingRef.current) {
          playLoop();
        }
      }, totalDuration * 1000);
    };

    playLoop();
  };

  const stopMelody = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Ignore if already stopped
      }
    });
    oscillatorsRef.current = [];
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    // Check if user has a saved preference
    const savedMuteState = localStorage.getItem('eduMemoryMusicMuted');
    if (savedMuteState === 'true') {
      setIsMuted(true);
    } else {
      // Auto-start music on mount if not explicitly muted
      // We need to wait for user interaction due to browser autoplay policies
      const handleFirstInteraction = () => {
        if (!hasInteractedRef.current && !isMuted) {
          hasInteractedRef.current = true;
          initAudioContext();
          setIsPlaying(true);
        }
      };

      // Listen for any user interaction to start music
      document.addEventListener('click', handleFirstInteraction, { once: true });
      document.addEventListener('keydown', handleFirstInteraction, { once: true });
      document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    }

    return () => {
      stopMelody();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    // Sync the ref with the state
    isPlayingRef.current = isPlaying && !isMuted;
  }, [isPlaying, isMuted]);

  useEffect(() => {
    if (isPlaying && !isMuted) {
      playMelody();
    } else {
      stopMelody();
    }
  }, [isPlaying, isMuted]);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('eduMemoryMusicMuted', String(newMutedState));

    if (newMutedState) {
      setIsPlaying(false);
      stopMelody();
    } else {
      // Initialize audio context on user interaction
      initAudioContext();
      setIsPlaying(true);
    }
  };

  return (
    <Button
      onClick={toggleMute}
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 z-50 bg-white/[0.1] backdrop-blur-sm border-white/[0.2] hover:bg-white/[0.15] h-10 w-10 rounded-full shadow-lg"
      title={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted || !isPlaying ? (
        <VolumeX className="w-5 h-5 text-[#94a3b8]" />
      ) : (
        <Volume2 className="w-5 h-5 text-[#7dd3fc]" />
      )}
    </Button>
  );
}