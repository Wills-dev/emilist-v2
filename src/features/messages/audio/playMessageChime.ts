export const playMessageChime = (context: AudioContext) => {
  const start = context.currentTime;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.2, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
  gain.connect(context.destination);
  const tone = context.createOscillator();
  tone.type = "sine";
  tone.frequency.setValueAtTime(660, start);
  tone.frequency.setValueAtTime(880, start + 0.14);
  tone.connect(gain);
  tone.onended = () => { tone.disconnect(); gain.disconnect(); };
  tone.start(start); tone.stop(start + 0.4);
};
