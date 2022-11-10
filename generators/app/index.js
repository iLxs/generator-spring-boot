const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // This method adds support for a `--custom-option` flag
        // this.option('custom-option');
    }
    
    initializing() {
        this.log("Generating SpringBoot Application");
    }

    prompting() {
        const prompts = [
        {
            type: "string",
            name: "appName",
            message: "What is the application name?",
            default: "cp-component"
        },
        {
            type: "string",
            name: "packageName",
            message: "What is the package name?",
            default: "com.lxs.cp.component"
        }
        ];

        return this.prompt(prompts).then(answers => {
        this.appName = answers.appName;
        this.appNameForCode = this._capitalizeAppName(answers.appName);
        this.packageName = answers.packageName;
        this.packageDirectory = this._getPackageDirectory(answers.packageName);
        });
    }

    _capitalizeAppName(appName) {
        var words = appName.split('-');
        return words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
    }

    _getPackageDirectory(packageName) {
        return packageName.replace('.', '/');
    }

    writing() {
        this.fs.copy(
        this.templatePath("common-files"),
        this.destinationPath(this.appName)
        );

        this.fs.copyTpl(
        this.templatePath("devops/deployment.yaml"),
        this.destinationPath(this.appName + "/devops/deployment.yaml"),
        {
            appName: this.appName
        }
        );

        this.fs.copyTpl(
        this.templatePath("pom.xml"),
        this.destinationPath(this.appName + "/pom.xml"),
        {
            appName: this.appName,
            packageName: this.packageName
        }
        );

        this.fs.copyTpl(
        this.templatePath("src/main/java/com/lxs/cp/component/ComponentApplication.java"),
        this.destinationPath(this.appName + "/src/main/java/" + this.packageDirectory + "/" + this.appNameForCode + "Application.java"),
        {
            appNameForCode: this.appNameForCode,
            packageName: this.packageName
        }
        );
    }

    end() {
        this.log(`Application ${this.appName} generated successfully`);
    }
};