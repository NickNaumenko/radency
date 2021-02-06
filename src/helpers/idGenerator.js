const idGenerator = (start = 0) => {
  let id = start;
  return function generateId() {
    return id++;
  };
};

export default idGenerator;
