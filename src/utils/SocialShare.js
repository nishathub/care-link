
export const shareOnFacebook =  () => {
  const url = window.location.href;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  window.open(facebookShareUrl, "_blank");
}

export const shareOnTwitter = () => {
  const url = window.location.href;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}`;
  window.open(twitterShareUrl, "_blank");
}

export const shareOnWhatsApp = () => {
  const url = window.location.href;
  const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    url
  )}`;
  window.open(whatsAppShareUrl, "_blank");
}

export const shareOnTelegram = () => {
  const url = window.location.href;
  const telegramShareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(
    url
  )}`;
  window.open(telegramShareUrl, "_blank");
}

export const shareOnLinkedIn = () => {
  const url = window.location.href;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;
  window.open(linkedInShareUrl, "_blank");
}