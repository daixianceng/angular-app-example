# angular-app-example

<p align="center">
  <a href="https://backend.zhaidongxi.com/" target="_blank">
    <img src="./media.gif" alt="angular-app-example" />
  </a>
</p>

This is an example app for [Angular](https://github.com/angular/angular).

[中文文档](./README.zh_CN.md)

The [demo](https://backend.zhaidongxi.com/) account information:

- Username: `admin`
- Password: `admin`

**Note: Please don't change the password. You can add an account for yourself**

This application provides the following features:

- Google [Material](https://github.com/angular/material2) Design
- User Login
- [Charts](https://github.com/swimlane/ngx-charts) and [Datatable](https://github.com/swimlane/ngx-datatable)
- Create/Update/Delete Data
- Search/Sort Data
- File upload
- HTTP Interceptor

## Quick Start

```
git clone https://github.com/daixianceng/angular-app-example.git
cd angular-app-example

# Install Angular CLI if necessary
npm install -g @angular/cli@latest

# For Windows user if an error occurred
npm install -g windows-build-tools

# Install dependencies
npm install
# Run application in development
npm start
```

Now you can open `localhost:4200` in your borwser. The project depends on the API of [yii2-app-example](https://github.com/daixianceng/yii2-app-example). This is a clean and beautiful RESTful API, you will love it. The project has a default proxy to `https://backend.zhaidongxi.com/api`, so you do not need to install `yii2-app-example`.

Compile the project:

```
npm run build
```

## Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /dist/                           # The folder for compiled output
├── /e2e/                            # The end-to-end tests
├── /node_modules/                   # 3rd-party libraries and utilities
├── /src/                            # The source code of the application
│   ├── /app/                        # The core source code
│   │   ├── /common/                 # The utilities
│   │   ├── /components/             # Angular components
│   │   ├── /containers/             # The page modules
│   │   ├── /layouts/                # The page layouts
│   │   ├── /models/                 # The data models
│   │   ├── /services/               # Angular services
│   │   ├── /stores/                 # The stores of the application
│   │   ├── /app-routing.module.ts   # The routing module
│   │   ├── /app.component.html      # The template of the root component
│   │   ├── /app.component.scss      # The style of the root component
│   │   ├── /app.component.spec.ts   # The unit test for root component
│   │   ├── /app.component.ts        # The root component
│   │   └── /app.modules.ts          # The root module
│   ├── /assets/                     # Static files which are copied into the /dist folder
│   ├── /environments/               # The folder contains environment configurations
│   │   ├── /environment.prod.ts     # The file for production environment
│   │   └── /environment.ts          # The file for development environment
│   ├── /themes/                     # The folder contains themes of the application
│   ├── /app-theme.scss              # Define the current theme
│   ├── /favicon.ico                 # Angular icon
│   ├── /index.html                  # The main HTML page
│   ├── /main.ts                     # The main entry point for application
│   ├── /polyfills.ts                # The file includes polyfills
│   ├── /styles.scss                 # The global styles of the application
│   ├── /test.ts                     # The main entry point for unit tests
│   ├── /tsconfig.app.json           # TypeScript compiler configuration for application
│   ├── /tsconfig.spec.json          # TypeScript compiler configuration for unit tests
│   └── /typings.d.ts                # TypeScript Typings
├── .editorconfig                    # Configuration for your editor
├── .gitignore                       # Git ignore configuration
├── .jsbeautifyrc                    # Configuration for Beautify plugin
├── angular.json                     # Configuration for Angular CLI
├── karma.conf.js                    # Configuration for Karma
├── LICENSE                          # The license of the project
├── media.gif                        # The project demo animation file
├── package.json                     # The list of 3rd party libraries and utilities
├── protractor.conf.js               # End-to-end test configuration for Protractor
├── proxy.json                       # The proxy configuration in development
├── README.md                        # Documentation
├── README.zh_CN.md                  # Chinese documentation
├── sass-lint.yml                    # Configuration for Sass Lint
├── tsconfig.json                    # TypeScript compiler configuration
└── tslint.json                      # Linting configuration for TSLint and Codelyzer
```

## License

**angular-app-example** is released under the BSD 3-Clause License. See the bundled `LICENSE` for details.
