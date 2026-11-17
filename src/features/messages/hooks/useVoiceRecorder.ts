import { useEffect, useRef, useState } from "react";

const stopTracks = (stream: MediaStream | null) => stream?.getTracks().forEach((track) => track.stop());
const recordingType = () => ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find((type) => MediaRecorder.isTypeSupported(type));

export const useVoiceRecorder = (onRecorded: (file: File) => void) => {
  const [recording, setRecording] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const cancelled = useRef(false);
  const generation = useRef(0);
  useEffect(() => () => {
    generation.current += 1;
    cancelled.current = true;
    if (recorder.current?.state === "recording") recorder.current.stop();
    stopTracks(stream.current);
  }, []);
  const start = async () => {
    if (starting || recorder.current?.state === "recording") return;
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Voice recording is unavailable in this browser. You can attach an audio file instead."); return;
    }
    const session = ++generation.current;
    setStarting(true); setError(""); cancelled.current = false;
    try {
      const audio = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (session !== generation.current) { stopTracks(audio); return; }
      stream.current = audio;
      const mimeType = recordingType();
      const active = new MediaRecorder(audio, mimeType ? { mimeType } : undefined);
      const chunks: Blob[] = [];
      let size = 0;
      recorder.current = active;
      active.ondataavailable = (event) => {
        if (event.data.size) { chunks.push(event.data); size += event.data.size; }
        if (size > 14 * 1024 * 1024 && active.state === "recording") active.stop();
      };
      active.onstop = () => {
        stopTracks(audio);
        if (session !== generation.current) return;
        recorder.current = null; stream.current = null; setRecording(false);
        if (cancelled.current || !size) return;
        const type = active.mimeType || chunks[0]?.type || "audio/webm";
        const extension = type.includes("mp4") ? "m4a" : type.includes("ogg") ? "ogg" : "webm";
        onRecorded(new File(chunks, `voice-${Date.now()}.${extension}`, { type }));
      };
      active.onerror = () => {
        cancelled.current = true;
        if (active.state === "recording") active.stop();
        recorder.current = null; stopTracks(audio); setRecording(false);
        setError("Recording failed. Please try again.");
      };
      active.start(1000); setRecording(true);
    } catch {
      stopTracks(stream.current); recorder.current = null;
      if (session === generation.current) setError("Could not access your microphone. Check your browser permissions and try again.");
    } finally { if (session === generation.current) setStarting(false); }
  };
  const stop = () => { if (recorder.current?.state === "recording") recorder.current.stop(); };
  const cancel = () => { cancelled.current = true; stop(); };
  return { recording, starting, error, start, stop, cancel };
};
