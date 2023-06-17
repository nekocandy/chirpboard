export function getGravatarImageURL(email: string) {
  const hash = md5(email.trim().toLowerCase())
  return `https://www.gravatar.com/avatar/${hash}?size=1024`
}
