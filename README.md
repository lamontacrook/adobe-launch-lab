# Adobe Launch Lab

## Table of Contents
1. [Setting Up the Environment](#setup-up-the-environment)
2. [Overview](#overview)
4. [Develop a Data Layer](#develop-a-data-layer)
3. [Create a Launch Property](#create-a-launch-property)
4. [Setup Environments](#setup-environments)
5. [Implement the embed code](#implement-the-embed-code)
6. [Data Elements and Rules](#data-elements-and-rules)
7. [Create Data Element](#create-data-element)
8. [Extensions](#extensions)
9. [Add a new extension](#add-new-extension)


## Setting Up the Environment

At the end of this lesson, you will:
* Install Chrome Developer Tools
* Install Adobe Experience Cloud Debugger
* Choose a development editor for this lab

In order to work with Launch and learn the basics of Tag Management and creating a data layer we first need a site to work with.  We will be using a couple sample websites that can be cloned in this repository.

You will also need a webserver to run the websites on.  For Launch to work you need a properly formed URL.  If you don't have a local webserver running on your machine I would recommend this [Chrome extension](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb).  This will allow you to browse to these local websites using your browser.  You can certainly use whatever webserver you would like as long as you can edit and change the HTML of the files.

Within this repository, you should find two directories, [/victory](https://github.com/lamontacrook/adobe-launch-lab/tree/master/victory) and [/apex-app](https://github.com/lamontacrook/adobe-launch-lab/tree/master/victory/apex-app).  These directories are the websites that we will be tagging.  If you are using [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) you will need to select these directories as we go through the labs.

Since we will be editing HTML, you will want to have an integrated development environment (IDE) installed on your computer.  I use Visual Studio Code which you can find [here](https://code.visualstudio.com/). 

For debugging purposes, let's  install two tools.  First, ensure that you have Chrome developer tools installed - https://developers.google.com/web/tools/chrome-devtools.  Additonally, install the Experience Cloud debugger - https://chrome.google.com/webstore/detail/adobe-experience-cloud-de/ocdmogmohccmeicdhlhhgepeaijenapj?hl=en.  We will be using this to debug the Experience Cloud products.

## Overview

Each lesson contains how-to exercises and foundational information to help you implement the Experience Cloud and understand its value. Callouts are provided to highlight information which might be useful to customers migrating from our older tag manager - Dynamic Tag Management. Demo sites are provided for you to complete the tutorial, so you can learn the underlying techniques in a safe environment. After completing this tutorial, you should be ready to start implementing all of your marketing solutions through Launch on your own website.

## Develop a Data Layer

__Objective__
In this lesson, you will learn some best practice for developing a data layer.

At the end of this lesson, you will be able to:
* Work with a data layer in javascript
* Clone this repository in Visual Studio Code
* Debug the data layer in the Chrome developer tools

A datalayer can be anything.  It could be surface within HTML or within a JavaScript object.  The latter is the broadly accepted method for creating a data layer.  The W3C has published a standard for building a datalayer.  We will be using that for our exercise.  It is strongly advised to have a corporate standard.  

1. Start the Web Server for Chrome and make sure you have selected the "victory" in the setup window. ![Chrome Web Server](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/200Ok.png "Chrome Web Server")

2. Browse to http://127.0.0.1:8887 in your chrome browser. You should see the home page. 

![Victory Home Page](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/home_page.png "Victory Home Page")

3. Using your chosen editor let's open the home page to edit.  If you are using Visual Studio Code, you can clone all of the content on github from within the editor.  Simple begin by opening the editor, and clicking on the command palette in the lower left-hand corner.  And, from the drop down at the top of the screen choose or type in Git:Clone.

![Visual Studio Code](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/gitclone.png "Visual Studio Code")

4. The will provide you with a prompt for the URL to the repository.  You will be able to find this on by scrolling up on this page.  Toward the top of the page you will see a green button that says "Clone or download".  Click on this and you will see a modal with the repository URL copy that and put it into the prompt within Visual Studio Code.

![Repository](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/repo.png "Repository")

5. [Need to validate remaining steps...  ] https://code.visualstudio.com/docs/editor/versioncontrol

6. You should now have a project on the left hand side with all the assets for this exercise.

7. Once you have all the assets, open the victory folder and index.html.  This will open the page in an HTML editor. Copy the code block below.  We will be using this to begin to build our data layer.

```
<script type="text/javascript">
    var digitalData = {
        pageInstanceID: "[Unique ID Include Environement]",
        page:{
            pageInfo: {
                pageID: "[Friendly Page Name for Reporting]",
                destinationURL: "[URL]"
            },
            category:{
                primaryCategory: "[Category]",
                subCategory1: "[Sub-Category]",
                pageType: "[Type of Page]"
            },
            attributes:{
                country: "[Country Code]",
                language: "[Localization]"
            }
        }
    };
</script>
```
8. This data layer is an inline JavaScript object.  In-line javascript can be included anywhere on this page.  This code snippet not only set elements but it also instantiates the object, so it will be important to have this as high on the page as possible.  Let's put this code just above the closing `</head>` tag.

9. Once you have pasted the data layer, you can begin by replacing the values with meaningful data.  For instance, for pageID: "[Friendly Page Name for Reporting]" let's update to reflect the actual name of the page.  Something like pageID: "Home Page" would work for this page.  Feel free update the other values as well.

10. Once you have completed this, let's move back to Chrome and to our Victory site.  Let's do a hard refresh of the page and open the Chrome Developer Tools.  In the developer tools, navigate to the Console section and type in the name of our datalayer object "digitalData". This will print out the javascript object that is in memory on the page.  You should see the same values that you created when tagging the page.

![Dev Tools](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/dev_tools.png "Dev Tools")

11. As time allows please feel free to tag other pages using the same method.

#### Resources:
* https://theblog.adobe.com/data-layers-buzzword-best-practice/
* https://www.w3.org/2013/12/ceddl-201312

## Create a Launch Property

__Objective__
In this lesson, you will create your first Launch property.

A property is basically a container that you fill with extensions, rules, data elements, and libraries as you deploy tags to your site.

At the end of this lesson, you will be able to:
* Log into the Launch user interface
* Create a new Launch property
* Configure a Launch property

1. Log into the Experience Cloud.
2. Select __Launch__ from the menu.
3. Under Launch, by Adobe, click the Go to Launch button.
4. You should now see the Properties screen (if no properties have ever been created in the account this screen might be empty):

__NOTE:__ A property is a container that you fill with extensions, rules, data elements, and libraries as you deploy tags to your site. A property can be any grouping of one or more domains and subdomains. You can manage and track these assets similarly.

For example, suppose that you have multiple websites based on one template, and you want to track the same assets on all of them. You can apply one property to multiple domains. For more information on creating properties, read Companies and Properties in the product documentation or watch the Creating your first property video.

5. Click __New Property__.
6. Name your property (for example, “Victory [Your Name]”).  As the domain, enter localhost.
7. Click __Save__.

Your new property should display on the Properties page. If you check the box next to the property name, options to __Configure__ or __Delete__ the property appear above the property list. Click on the name of your property to open the Overview screen.

## Setup Environments

__Lesson Context__
This lesson introduces two of the main concepts of Launch:
* Environments
* Embed Codes

New properties are created with three environments:
* Development
* Staging
* Production

These environments correspond to the typical stages in the code development and release process. If desired, you can add additional Development environments, which is common on larger teams with multiple developers working on different projects at the same time.

The embed code is a `<script>` tag that you put on the pages of your site to load and execute the logic you build in Launch. If you load the library asynchronously, the browser continues to load the page, retrieves the Launch library, and executes it in parallel. In this case, there is only one embed code, which you put in the `<head>`. When Launch is deployed synchronously, there are two embed codes, one which you put in the <head> and another which you put before the `</body>`.

This lesson shows how to implement the asynchronous embed code of your Launch property's Development environment.

__Objectives__
At the end of this lesson, you will be able to:

Obtain the embed code for your Launch property
* Understand the difference between a Development, Staging, and Production environment
* Add a Launch embed code to an HTML document
* Explain the optimal location of the Launch embed code in relation to other code in the <head> of an HTML document

### Setup environments
From the property Overview screen, click on the Environments tab to go to the environments page. Note that Development, Staging, and Production environments have already been created for you.

Development, Staging, and Production environments correspond to the typical environments in the code development and release process. Code is first written by developers in a Development environment. When they have completed their work, they send it to a Staging environment for QA and other teams to review. After the QA and other teams are satisfied, the code is published to the Production environment, which is the public-facing environment which your visitors experience when they come to your website.

Launch permits additional Development environments, which is useful in large organizations where multiple developers work on different projects at the same time.

These are the only environments needed to complete the tutorial. Environments allow you to have different working versions of your Launch libraries hosted at different URLs, so you can safely add new features and make them available to the right users (such as developers, QA engineers, the public, and so on) at the right time

1. In the Development row, click the __Install__ icon to open the modal.
__Note:__ Launch defaults to the asynchronous embed codes.
2. Click the copy icon to copy the installation code to your clipboard.
3. Click __Close__ to close the modal.

## Implement the embed code

The embed code should be implemented in the `<head>` element of all HTML pages that share the property. You might have one or several template files that control the `<head>` globally across the site, making it a straightforward process to add Launch.

```
<!--Launch Header Embed Code: PASTE JUST ABOVE CLOSING </HEAD> TAG ON HOME PAGE-->

<script src="https://assets.adobedtm.com/launch-ENa21cfed3f06f4ddf9690de8077b39e81-development.min.js" async></script>

<!--/Launch Header Embed Code-->
```

Open your web browser’s developer tools and go to the Network tab. At this point, you should see a 404 error for the Launch environment URL:

![404 Error](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/L780_image8 "404 Error")

The 404 error is expected because you haven't built a library in this Launch environment yet. You will do that in the next lesson. If you see a "failed" message instead of a 404 error, you probably forgot to add the https:// protocol in the embed code. Again, you only need to specify the https:// protocol if you are loading the sample page using the file:// protocol. Make that change and reload the page until the 404 error appears.

### Launch implementation best practices

Review some of the Launch implementation best practices that are demonstrated in the sample page:
* __JavaScript helper libraries:__ If you already have a library like JQuery implemented in the <head> of your pages, load it before Launch in order to leverage its syntax in Launch and Target.
* __HTML5 doctype:__ The HTML5 doctype is required for Target implementations.
* __preconnect and dns-prefetch:__ Use preconnect and dns-prefetch to improve the page load time. See also: https://w3c.github.io/resource-hints/.
* __Pre-hiding snippet for asynchronous Target implementations:__ To manage content flicker when Target is deployed via asynchronous Launch embed codes, you should hardcode a pre-hiding snippet on your pages before the Launch embed codes. This is discussed in the Target tutorial.

## Data Elements and Rules
This lesson introduces some of the main concepts of Launch:
* __Data elements:__ Store the attributes you want to send to your marketing and advertising solutions
* __Rules:__ Fire the requests to those solutions under the right conditions
* __Libraries:__ JavaScript files that load on the page to do all of the work

Data elements and rules are the basic building blocks of Launch. 

__Note:__ New data element types have been added to Launch, which did not exist in DTM. Some of the new data element types include Local Storage, Session Storage, Page Info, and Random Number

This lesson uses all three of these items to make the sample page perform an action.

__Objective__

At the end of this lesson, you will be able to:
* Create a data element
* Create a rule
* Create a library
* Add changes to a library
* Validate that your library is loading in your web browser
* Use the Working Library feature to work more efficiently

## Create Data Element
Data elements are Launch’s version of a data layer. They can store values from your own data layer object, cookies, local storage objects, query string parameters, page elements, meta tags, and so on.

__Note:__ Data element capabilities can be extended with Extensions. For example, the ContextHub extension allows you to add data elements using features of the extension.

This exercise shows how to create a data element for Page Name, which will be used later in the Target and Analytics implementations.

!. In the top navigation, click Data Elements. Because you haven’t created any data elements yet in this property, a brief video appears with additional information on this topic. Watch this video, if you like.
2. Click __Create New Data Element__.
3. Name the data element (for example, "Page Name").
4. Use the JavaScript Variable Data Element type to point to a value in your sample page's data layer: `digitalData.page.pageInfo.pageName`.
5. Use not available as the Default Value. The Default Value tells Launch what value to use for the data element if your JavaScript Variable specified above is not found.
6. Check the boxes for __Force lowercase__ value and __Clean text__ to standardize the case and remove extraneous spaces.
7. Leave __None__ as the __Storage Duration__ setting, because this value is typically different on every page.
8. Save the data element.

## Extensions

An extension is a packaged set of code that extends the Launch interface and the library functionality. Launch is the platform, and extensions are like apps that run on the platform.

Adding an extension adds new data elements and new options for creating rules.

Extensions determine the elements that are available when building properties, rules, and data elements. They provide:
* Events, conditions, and exceptions
* Data elements
* JavaScript

Use the links at the top of the Extensions list to view installed extensions, the extensions catalog, or updates.

Select an extension, then click Configure to view and change the extension's settings.

Important: Changes do not take effect until they are published.

By default, Adobe provides extensions that support common integrations. Extensions can be modified with custom configurations. Configurations are provided through the extensions. To create a configuration, click the extension card, then click Add New Configuration.

### Extension catalog
Use the extension catalog to browse, configure, and deploy marketing and advertising technology built and maintained by independent software vendors, as well as extensions for Adobe solutions.

The Extensions page provides three views:
* __Installed:__ Shows all of your installed extensions.
* __Catalog:__ Shows all available extensions
* __Updates:__ Shows updates to installed extensions.

Click Extensions to see all your installed extensions. You can also use the catalog to see a list of all available extensions and which extensions have updates available.

## Add a new extension
Launch is highly extendible. Extensions add core functionality to Launch.

A common use of extensions is to create integrations with other applications. In the previous version of Launch, known as Dynamic Tag Management, extensions were called tools.

1. From a property's overview page, open the Extensions tab.
2. Select an extension.

![Extensions](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/L780_image11 "Extensions")

3. If the extension exists, select it from the extensions catalog.
4. Mouse over an extension in your list to configure or disable it.
5. Add other extensions from the catalog if they are not currently in your list.

The Core extension is the starting point for your new extension. The default extension provides:
1. Default event
2. Default conditions and exceptions
3. Default JavaScript
These defaults are the basis for the custom rules you'll build to create your extension.

[NEED TO USE CONTEXT HUB EXTENSION]


