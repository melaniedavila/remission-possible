const moduloWrap = function (value, modulo) {
  // if we just do `value % modulo` we run the risk of getting a negative number
  return ((value % modulo) + modulo) % modulo;
};

export default moduloWrap;
