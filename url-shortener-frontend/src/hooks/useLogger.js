import axios from 'axios';

export const useLogger = () => {
  const log = async (stack, level, pkg, message) => {
    try {
      const tokenRes = await axios.post(process.env.REACT_APP_AUTH_URL, {
        email: process.env.REACT_APP_EMAIL,
        name: process.env.REACT_APP_NAME,
        rollNo: process.env.REACT_APP_ROLL,
        accessCode: process.env.REACT_APP_ACCESS_CODE,
        clientID: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET
      });

      const token = tokenRes.data.access_token;

      await axios.post(
        process.env.REACT_APP_LOGGING_URL,
        {
          stack,
          level,
          package: pkg,
          message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (err) {
      console.error("Logging failed:", err.message);
    }
  };

  return { log };
};
