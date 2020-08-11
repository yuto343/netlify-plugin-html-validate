module.exports = {
  onPostBuild: async ({ utils, inputs, constants }) => {
    try {
      await utils.run("html-validate", [
        ...(inputs.config ? ["--config", inputs.config] : []),
        "--ext",
        inputs.ext,
        ...(inputs.dir
          ? inputs.dir.split(",").map((dir) => {
              return `${constants.PUBLISH_DIR}/${dir}`;
            })
          : constants.PUBLISH_DIR),
      ]);
    } catch (error) {
      if (error.exitCode === 1) {
        return utils.build.failBuild("Invalid HTML", { error });
      }
      return utils.build.failBuild("Unknown error", { error });
    }
  },
};
