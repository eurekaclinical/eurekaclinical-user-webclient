# Eureka! Clinical User Web Client
[Georgia Clinical and Translational Science Alliance (Georgia CTSA)](http://www.georgiactsa.org), [Emory University](http://www.emory.edu), Atlanta, GA

## What does it do?
This project contains the web client for Eureka! Clinical
User Services. It is an Angular 4/5 single-page site.

## Version 1.0
Initial release.

## Build requirements
* [Oracle Java JDK 8](http://www.oracle.com/technetwork/java/javase/overview/index.html)
* [Maven 3.2.5 or greater](https://maven.apache.org)

## Runtime requirements
* Any web browser that is supported by Angular 4/5 (see
  https://angular.io/guide/browser-support).
* `eurekaclinical-user-webapp` version 2.0 from
  https://oss.sonatype.org/content/groups/public/org/eurekaclinical/eurekaclinical-user-webapp/2.0/eurekaclinical-user-webapp-2.0.war,
  accessible over the internet from your web browser. See
  https://github.com/eurekaclinical/eurekaclinical-user-webapp for installation instructions. 
* `eurekaclinical-user-service` version 2.0 from
  https://oss.sonatype.org/content/groups/public/org/eurekaclinical/eurekaclinical-user-service/2.0/eurekaclinical-user-service-2.0.war,
  accessible over the internet from your web browser. See
  https://github.com/eurekaclinical/eurekaclinical-user-service for installation instructions.

## Building it
We use maven, node, and gulp to build the project. You need to install
maven on your computer. Maven handles downloading and installing node
and gulp for you. Maven installs node in the .eurekaclinical/dev
directory in your home directory. It installs the node modules that
are needed to build this project in the node_modules directory at the
root of this project.

To build the project and bring up the webserver, execute `mvn clean install -Pwebserver` 
at the command line. For simple file changes, not additions or deletions, 
you can usually use `mvn install -Pwebserver`. To create a zipfile suitable for
distribution, execute `mvn install -Pdist`.

## Performing system tests
To run the web client on your machine for testing purposes, do the
following:

1. Clone the [eurekaclinical-user-webapp](https://github.com/eurekaclinical/eurekaclinical-user-webapp)
project from GitHub, and execute `mvn clean install`
followed by `mvn process-resources cargo:run -Ptomcat` in the root directory of the
project on the command line to run the server-side Eureka! Clinical
User code in embedded tomcat. The backend services must be
listening on port 8443, which is the default.
2. Back in the root directory of the web client project, execute
`mvn clean install -Pwebserver`. It will open the web client in your
default web browser at https://localhost:4200 in an embedded web
server. You can leave the backend eureka code running while you
repeatedly build and run the web client.

### Configuration
This web client is configured using a JSON file, `config.json`, that
should be in the src/assets directory in your project. It supports 
specifying the following options:
* `logoutUrl`: The URL that the web client will go to when the user
  clicks the `Logout` click in the upper right corner of the
  page. Before going to this URL, the web client will destroy the
  user's session. 
* `userWebappUrl`: The URL for eureka-webapp. The default value is
  `https://localhost:4200/eurekaclinical-user-webapp`.
* `googleOAuthID`: Client Id for google OAuth.
* `githubOAuthID`: Client Id for github OAuth.
* `globusOAuthID`: Client Id for globus OAuth.
* `helpUrl`: The URL for help site.
* `idleWaitTime`: The time period that the user gets notification before system logout automatically if user stays idle.

Specify the options as properties of a single JSON object. See the
default `config.json` file in the src/assets under the root directory
of this project for a sample. The assets folder is copied into the `dist` 
directory during the build process.

## Developer documentation


## Getting help
Feel free to contact us at help@eurekaclinical.org.
