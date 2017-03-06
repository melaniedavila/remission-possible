const moduloWrap = function (value, modulo) {
  // If we just do `value % modulo` we run the risk of getting a negative number
  return ((value % modulo) + modulo) % modulo;
};

export default moduloWrap;
