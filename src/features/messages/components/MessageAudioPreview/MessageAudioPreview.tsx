import { useAudioPreview } from "../../hooks/useAudioPreview";

const MessageAudioPreview = ({ file }: { file: File }) => {
  const audioRef = useAudioPreview(file);
  return <audio ref={audioRef} controls preload="metadata" aria-label={`Preview ${file.name}`} className="mt-1 h-8 max-w-full" />;
};

export default MessageAudioPreview;
