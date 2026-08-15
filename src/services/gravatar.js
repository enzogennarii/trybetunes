import md5 from 'blueimp-md5';

const DEFAULT_SIZE = 200;

const getGravatarUrl = (email, size = DEFAULT_SIZE) => {
  const hash = md5((email || '').trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
};

export default getGravatarUrl;
