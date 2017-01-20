module.exports =  function () {
  return {
    deepEqual (actual, expected, description) {
      this.result = {actual, expected, description}
    },

    true: (actual, description) => {
      this.result = {actual, expected: true, description}
    }
  }
}
