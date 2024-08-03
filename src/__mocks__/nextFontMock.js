module.exports = new Proxy(
  {},
  {
    get: function getter() {
      return () => ({
        className: "satoshi-light",
        variable: "variable",
        style: { fontFamily: "fontFamily" },
      });
    },
  }
);
