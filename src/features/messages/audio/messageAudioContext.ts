let context: AudioContext | null = null;
let unlocked = false;
let subscribers = 0;

export const unlockMessageAudio = async (): Promise<AudioContext | null> => {
  try {
    const AudioConstructor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioConstructor) return null;
    if (!context || context.state === "closed") context = new AudioConstructor();
    if (context.state !== "running") {
      // Unlock silently during normal interaction, including Safari's audio session.
      const source = context.createBufferSource();
      source.buffer = context.createBuffer(1, 1, context.sampleRate);
      source.connect(context.destination);
      source.onended = () => source.disconnect();
      source.start();
      await context.resume();
    }
    if (context.state === "running") unlocked = true;
    return context.state === "running" ? context : null;
  } catch { return null; }
};
export const resumeMessageAudio = () => unlocked ? unlockMessageAudio() : Promise.resolve(null);
const gesture = () => { void unlockMessageAudio(); };
export const subscribeMessageAudio = () => {
  if (++subscribers === 1) {
    window.addEventListener("pointerdown", gesture);
    window.addEventListener("keydown", gesture);
    if (navigator.userActivation?.hasBeenActive) gesture();
  }
  return () => {
    if (--subscribers !== 0) return;
    window.removeEventListener("pointerdown", gesture);
    window.removeEventListener("keydown", gesture);
    // Keep the unlocked context across route changes; no sound runs when idle.
  };
};
