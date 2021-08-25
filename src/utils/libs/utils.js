const normalizePort = (port) => {
  const normalizedPort = parseInt(port, 10);

  if (Number.isNaN(normalizedPort)) {
    return port;
  }
  if (normalizedPort > 0) {
    return normalizedPort;
  }

  return false;
};

const handledFatalException = (error) => {
  console.log(error);
  process.exit(1);
};

export {
  normalizePort,
  handledFatalException,
};
