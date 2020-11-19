export const checkEnvVariables = (envVariables) => {
  envVariables.forEach((envVar) => {
    if (!process.env[envVar])
      console.warn(`Environment variable ${envVar} appears to be missing.`);
  });
};
