function loadFile(file) {
  const reader = new FileReader();

  return new Promise((res, rej) => {
    reader.onload = function onLoad() {
      res(reader.result);
    };

    reader.onerror = function onError() {
      rej(reader.error);
    };
    reader.readAsText(file);
  });
}

export default loadFile;
