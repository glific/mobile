const URL_SUFFIX = process.env.SERVER_URL_SUFFIX;
export const SERVER_URL_SUFFIX = URL_SUFFIX != '' ? '.' + URL_SUFFIX : '';
