export const WALLET_CONNECTION_HISTORY_COOKIE = 'has_connected';

type CookieOptions = {
  path?: string;
  maxAge?: number;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
};

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  if (typeof document === 'undefined') return;
  const {
    path = '/',
    maxAge,
    sameSite = 'Lax',
    secure = false,
  } = options;

  let cookieString = `${name}=${value}; Path=${path}; SameSite=${sameSite}`;

  if (maxAge !== undefined) {
    cookieString += `; Max-Age=${maxAge}`;
  }

  if (secure) {
    cookieString += '; Secure';
  }
  document.cookie = cookieString;
}

export const deleteCookie = (name: string, path: string = '/') => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Path=${path}; Max-Age=0; SameSite=Lax`;
}

