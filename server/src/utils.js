import { fileURLToPath } from 'url';
import { dirname } from 'path';


export const generateConfig = (url, accessToken) => {
    return {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken} `,
        "Content-type": "application/json",
      },
    };
  };


  export function getDirname() {
    const __filename = fileURLToPath(import.meta.url);
    return dirname(__filename);
  }