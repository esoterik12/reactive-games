export function validatePictureLink(link: string) {
  if (link.trim().length === 0) {
    return false
  }

  const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
  if (!urlRegex.test(link)) {
    return false
  }

  const wikimediaRegex = /^(https?:\/\/)?([\w-]+\.)?wikimedia\.org(\/.*)?$/;
  if (!wikimediaRegex.test(link)) {
    return false
  }

  return true
}