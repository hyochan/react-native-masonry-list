const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['dooboo-ui', '@dooboo-ui'],
      },
    },
    argv,
  );

  // Remove existing rules about SVG and inject our own
  // (Inspired by https://github.com/storybookjs/storybook/issues/6758#issuecomment-495598635)
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.oneOf) {
      let hasModified = false;

      const newRule = {
        ...rule,
        oneOf: rule.oneOf.map((oneOfRule) => {
          if (oneOfRule.test && oneOfRule.test.toString().includes('svg')) {
            hasModified = true;

            const test = oneOfRule.test.toString().replace('|svg', '');

            return {...oneOfRule, test: new RegExp(test)};
          } else return oneOfRule;
        }),
      };

      // Add new rule to use svgr
      if (hasModified) {
        newRule.oneOf.unshift({
          test: /\.svg$/,
          exclude: /node_modules/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                viewBox: true,
              },
            },
          ],
        });
      }

      return newRule;
    } else return rule;
  });

  return config;
};
