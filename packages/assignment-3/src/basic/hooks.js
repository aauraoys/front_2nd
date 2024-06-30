export function createHooks(callback) {
  let state = [];
  let currentStateIndex = 0;
  const useState = (initState) => {
    let currentIndex = currentStateIndex;
    currentStateIndex++;

    if (state[currentIndex] === undefined) {
      state[currentIndex] = initState;
    }

    const setState = (newState) => {
      if (state[currentIndex] !== newState) {
        state[currentIndex] = newState;
        callback();
      }
    };

    return [state[currentIndex], setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
    currentStateIndex = 0;
  };

  return { useState, useMemo, resetContext };
}
