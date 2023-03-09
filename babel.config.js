module.exports = api => {
  const isTest = api.env('test');
  let presets = [];

  if (isTest) {
    presets = [
      ["@babel/preset-env", {targets: {node: 'current'}}]
    ]
  } else {
    presets = [
      [
        "@babel/preset-env",
        {
          targets: {
            firefox: 57
          },
          modules: false
        }
      ],
      "@babel/preset-typescript",
    ]
  }

  return { presets };
};
