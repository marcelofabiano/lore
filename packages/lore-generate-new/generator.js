var path = require('path');
var fs = require('fs-extra');
var Generator = require('lore-generate').Generator;
var es6Targets = require('./targets/es6');
var esnextTargets = require('./targets/esnext');

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  canBeUsedOutsideLoreProjects: true,

  before: function(options) {
    var appName = options.appName;

    // Make changes to the projectDirectory where the lore project will be created
    options.projectDirectory = path.resolve(options.projectDirectory, appName);

    if(fs.existsSync(options.projectDirectory)) {
      var files = fs.readdirSync(options.projectDirectory);
      if (files.length > 0 && !options.force) {
        throw new Error("Could not create a new Lore app in '" + options.projectDirectory + "' (directory already exists and is not empty)");
      }
    }
  },

  after: function(options, targets) {
    var appName = options.appName;
    this.logger.info('Created a new Lore application `' + appName + '`');
  },

  targets: function(options) {
    if (options.esnext) {
      return esnextTargets;
    } else {
      return es6Targets;
    }
  }

});
