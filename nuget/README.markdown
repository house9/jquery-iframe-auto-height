#  jQuery iframe auto height plugin NuGet package

### Note
This is for .Net applications only.
<br/>Instructions are for use with Visual Studio.
<br/>The packages in the repository are not intended to be used directly in your application.

## Usage:


* Open the NuGet packager for your solutions, search for `jquery-iframe-auto-height`
* When you project is an MV application, install `jquery-iframe-auto-height MVC`, otherwise install `jquery-iframe-auto-height`

`jquery-iframe-auto-height` will install only the JavaScript files into your application. You will then have to included the javascript files yourself, 

`jquery-iframe-auto-height MVC` will install the JavaScript files and add a bundle configuration file, which will initialize itself. In order to include the bundle, add `@Scripts.Render("~/bundles/jquery-iframe-auto-height")` to your view. 

## Author

* Robert Sirre (http://robertsirre.nl/)