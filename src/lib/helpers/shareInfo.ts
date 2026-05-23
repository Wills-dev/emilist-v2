export const openShare = (
  platform: "whatsapp" | "X" | "facebook",
  url: string,
  shareText: string,
) => {
  const urls = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`,
    X: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };
  window.open(urls[platform], "_blank", "noopener,noreferrer");
};
