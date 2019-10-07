# Adobe Launch Lab

## Table of Contents
1. [Setting Up the Environment](#setup-up-the-environment)
2. [Lesson Overview](#overview)
4. [Develop a Data Layer](#develop-a-data-layer)
3. [Create a Launch Property](#create-a-launch-property)
4. [Setup Launch Publishing Environments](#setup-environments)
5. [Implement the embed code](#implement-the-embed-code)
6. [Data Elements and Rules](#data-elements-and-rules)
7. [Create Data Element](#create-data-element)
8. [Extensions](#extensions)
9. [Add a new extension](#add-new-extension)
10. [Add the Analytics Extension](#add-the-analytics-extension)
11. [Create a Rule](#create-a-rule)
12. [Publishing Workflow](#publishing-workflow)
13. [Install Context Hub](#install-context-hub)


## Setting Up the Environment

At the end of this lesson, you will:
* Have a locally-running web server
* Install Chrome Developer Tools
* Install Adobe Experience Cloud Debugger
* Choose a development editor for this lab
* Install node.js and aio

In order to work with Adobe, Launch and learn the basics of Tag Management and creating a data layer we first need a site to work with.  We will be using a couple of sample websites that can be cloned in this repository.

You will also need a webserver to run the websites on either remote or locally (such as through IIS or Apache).  If you don't have a local webserver running on your machine I would recommend this [Chrome extension](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb).  This will allow you to browse to these local websites using your browser.  You can certainly use whatever webserver you would like as long as you can edit and change the HTML of the files.

Within this  repository, you should find two directories, [/victory](https://github.com/lamontacrook/adobe-launch-lab/tree/master/victory) and [/apex-app](https://github.com/lamontacrook/adobe-launch-lab/tree/master/victory/apex-app).  These directories are the sample websites that we will be tagging.  If you are using [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) you will need to select these directories as we go through the labs.

Since we will be editing HTML, you will want to have an integrated development environment (IDE) installed on your computer.  I use Visual Studio Code which you can find [here](https://code.visualstudio.com/). Other options include [NotePad++](https://notepad-plus-plus.org/downloads/) or [Eclipse](https://www.eclipse.org/downloads/).
For debugging purposes, we will install two tools.  First, ensure that you have [Chrome developer tools](https://developers.google.com/web/tools/chrome-devtools) installed.  Additionally, install the [Experience Cloud Debugger](https://chrome.google.com/webstore/detail/adobe-experience-cloud-de/ocdmogmohccmeicdhlhhgepeaijenapj?hl=en).  We will be using this to debug the Experience Cloud products.

For the I/O Runtime exercise, you will need to ensure you have [node.js](https://nodejs.org/en/download/) installed and aio.  To install aio, after you have installed node.js run the following command in the terminal.  

```
npm install -g @adobe/aio-cli
```

AIO will install openwhisk.  Verify that openwhisk is in your path by typing in `wsk -h` from the terminal.  

## Lesson Overview

Each lesson contains how-to exercises and foundational information to help you implement the Adobe Experience Cloud and understand its value. Callouts are provided to highlight information which might be useful to customers migrating from our older tag manager - Dynamic Tag Manager (DTM). Demo sites are provided for you to complete the tutorial, so you can learn the underlying techniques in a safe environment. After completing this tutorial, you should be ready to start implementing all of your marketing solutions through Launch on your own website.

## Develop a Data Layer

__Objective__
In this lesson, you will learn some best practice for developing a data layer.

At the end of this lesson, you will be able to:
* Understand what a data layer is and how it can be used
* Work with a data layer in JavaScript
* Clone this repository in Visual Studio Code
* Debug the data layer in the Chrome developer tools

## Develop a Data Layer

__Objective__
In this lesson, you will learn some best practice for developing a data layer.

At the end of this lesson, you will be able to:
* Understand what a data layer is and how it can be used
* Work with a data layer in JavaScript
* Clone this repository in Visual Studio Code
* Debug the data layer in the Chrome developer tools

A data layer can be anything.  It could be surfaced within HTML or within a JavaScript object.  The latter is the broadly accepted method for creating a data layer.  The W3C has [published a standard]( https://www.w3.org/2013/12/ceddl-201312.pdf) for building a data layer.  We will be using that standard for our exercise.  It is strongly advised to have a corporate standard.  

1. Start the [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related) and make sure you have selected the "victory" in the setup window. ![Chrome Web Server](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/200Ok.png "Chrome Web Server") If you are using another environment…

2. Browse to http://127.0.0.1:8887 in your Chrome browser or the address of your local machine or webserver. You should see the home page. 

![Victory Home Page](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/home_page.png "Victory Home Page")

3. Using your chosen editor, open the home page to edit.  If you are using Visual Studio Code, you can clone all the content on GitHub from within the editor.  Begin by opening the editor, and clicking on the command palette in the lower left-hand corner.  And, from the drop down at the top of the screen choose or type in Git:Clone.

![Visual Studio Code](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/gitclone.png "Visual Studio Code")

4. The will provide you with a prompt for the URL to the repository.  You will be able to find this on by scrolling up on this page.  Toward the top of the page you will see a green button that says "Clone or download".  Click on this and you will see a modal with the repository URL copy that and put it into the prompt within Visual Studio Code.

![Repository](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/repo.png "Repository")

5. [Need to validate remaining steps...  ] https://code.visualstudio.com/docs/editor/versioncontrol

6. You should now have a project on the left-hand side with all the assets for this exercise.

7. Once you have all the assets, open the victory folder and index.html.  This will open the page in an HTML editor. Copy the code block below.  We will be using this to begin to build our data layer.

```
<script type="text/javascript">
    var digitalData = {
        pageInstanceID: "[Unique ID Include Environment]",
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
8. This data layer is an inline JavaScript object.  In-line JavaScript can be included anywhere on this page.  This code snippet not only sets elements, but it also instantiates the data layer object (`digitalData`), so it will be important to have this as high on the page as possible.  Put this code just above the closing `</head>` tag.

9. Once you have pasted the data layer, you can begin by replacing the placeholder values with meaningful data.  For instance, for pageID: "[Friendly Page Name for Reporting]" let's update to reflect the actual name of the page.  Something like pageID: "Home Page" would work for this page.  Feel free update the other values as well.

10. Once you have completed this, let's move back to Chrome and to our Victory site.  Let's dDo a hard refresh of the page by hitting F5 or ctrl+refresh button  and open the Chrome Developer Tools by hitting F12 or….  In the developer tools, navigate to the Console section and type in the name of our data layer object "`digitalData"`. This will print out the JavaScript object that is part of the DOM on the page.  You should see the same values that you created when tagging the page.

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

![404 Error](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/L780_image8.png "404 Error")

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

1. In the top navigation, click Data Elements. Because you haven’t created any data elements yet in this property, a brief video appears with additional information on this topic. Watch this video, if you like.

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

![Extensions](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/L780_image11.png "Extensions")

3. If the extension exists, select it from the extensions catalog.
4. Mouse over an extension in your list to configure or disable it.
5. Add other extensions from the catalog if they are not currently in your list.

The Core extension is the starting point for your new extension. The default extension provides:
1. Default event
2. Default conditions and exceptions
3. Default JavaScript
These defaults are the basis for the custom rules you'll build to create your extension.

## Add the Analytics Extension

The Analytics extension consists of two main parts:

* The extension configuration, which manages the core AppMeasurement.js library settings and can set global variables
* Rule actions to do the following:
    * Set Variables
    * Clear Variables
    * Send the Analytics Beacon

1. Go to __Extensions > Catalog__ and locate the Adobe Analytics extension.
2. Click __Install__.
3. Under __Library Management > Report Suites__, enter the report suite IDs you want to use with each Launch environment.

In this lab, you can use one report suite for all environments, but in production you would want to use separate report suites, as shown in the image below:

![Report Suite Configuration](https://github.com/lamontacrook/adobe-launch-lab/blob/master/images/L780_image12.png "Report Suite Configuration")

__Note:__ Use the Manage the library for me option as the Library Management setting. This makes it much easier to keep the core AppMeasurement.js code up-to-date.

4. Under __General > Tracking Server__, enter your tracking server (for example, tmd.sc.omtrdc.net).  Enter your SSL Tracking Server if your site supports https://.

![SSL](/images/L780_image13.png "SSL")

5. In the Global Variables section, set the Page Name variable using your Page Name data element, then click the __Data Element__ icon to open the modal and choose the page Page Name data element.
6. Click __Save to Library and Build__.

__Note:__ Global variables can be set in the extension configuration or in rule actions. Be aware that when setting variables with the extension configuration, the data layer must be defined before the Launch embed codes.

## Create a Rule

Next, use the data element you created in a simple rule. Rules are one of the most powerful features in Launch. They tell specifically what happens when a visitor interacts with your website. When the criteria outlined in your rules are met, the rule triggers the specified action.

Use the following steps to create a rule that outputs the Page Name data element value to the browser console.

1. In the top navigation, click __Rules__. Because you haven’t created any rules yet in this property, a brief video appears with additional information on the topic. Watch this video, if you like.
2. Click __Create New Rule__.
3. Click the Create New Rule button​

![Create Rule](/images/L780_image15.png "Create Rule")

3. Name the Rule (for example, "All Pages - Library Loaded"). This name uses a convention that indicates where and when the rule will fire, which makes it easier to identify and reuse as your Launch property matures.
4. Under Events, click __Add__.

![Add Rule](/images/L780_image16.png "Add Rule")

The Event tells Launch when the rule should fire and can be many things, including a page load, a click, a custom JavaScript event, and so on.

5. As the Event Type, select __Library Loaded (Page Top)__. When you select the Event Type, Launch pre-populates a name for the event using your selection. The default order for the event is 50. Ordering is a powerful feature in Launch that gives you precise control over the sequence of actions when multiple rules are triggered by the same event. This feature is used later in the tutorial.
6. Click __Keep Changes__.

![Keep Changes](/images/L780_image17.png "Keep Changes")

7. To fire this rule on all pages, leave __Conditions__ blank. If you open the Conditions modal, you will see that conditions can add both restrictions and exclusions based on a large variety of options, including URLs, data element values, date ranges, and more.
8. As the Action Type, select __custom code__. At this point, this is the only option. Later in the tutorial, as you add extensions, more options will become available.

Select __Open Editor__, then add the following to the code window:console.log('The page name is '+_satellite.getVar('Page Name'));

​![Select an Action](/images/L780_image18.png)
​
![Enter custom code](/images/L780_image19.png)​

10. Save the code window.
11. On the Action configuration screen, click __Keep Changes__.
12. Save the rule.

### Note for DTM Migrators
In Launch, rules are required in order to fire most marketing pixels. For example, in order to fire the Adobe Analytics Beacon, we must use a Rule to instruct Launch to do so.The Rule builder has been dramatically redesigned and rebuilt in Launch. Some of the main changes are:

* There is just one Rule builder. DTM rule-types like "Page Bottom", "Click", and "Direct Call" are all just event-types in the Rule builder. This makes it much easier to update a rule should you need to change the trigger from, say, a DOM Ready event to a custom event.
* There is a new "Custom Code" event-type
* Extensions can add new event types to the Rule builder. For example, the Target extension could eventually add built-in support for its at.js custom events, so custom code wouldn't be needed to use this feature.
* Extensions can add new actions to the Rule builder, reducing issues by deprecating reliance on custom code. You will be using many of these extension actions in this Tutorial.
* Rules are required to fire requests associated with most marketing tools. This will require a mindset adjustment, especially for things like setting Customer IDs, firing Analytics beacons, and firing the global mbox.

## Publishing Workflow
After you have implemented some key solutions of the Adobe Experience Cloud in your Development environment, it's time to learn the publishing workflow.

__Objectives__
At the end of this tutorial, you will be able to:
* Publish a Development library to the Staging environment
* Map a Staging library to your production website using the Debugger
* Publish a Staging library to the Production environment

### Save the rule to a library
After configuring a collection of extensions, data elements, and rules in the Launch interface, you need to package these capabilities and logic into a set of JavaScript code that you can deploy on your website so marketing tags fire when visitors come to the site. A library is the set of JavaScript code that does this.

In an earlier lesson, you implemented the embed code of your development environment on the sample page. When you loaded the sample page a 404 error was returned for the embed code URL because a Launch library had not been built yet and assigned to the environment. In this tutorial, you will put your new data element and rule in a library so that your sample page can do something.

1. Go to the Publishing tab and click Add New Library.

![Add New Library](/images/L780_image20.png)​

2. Name the library "Initial Setup."
3. Select __Environment > Development_.
4. Click __Add All Changed Resources_. Launch summarizes the changes you just made.
5. Click __Save & Build for Development__

![21](/images/L780_image21.png)

After a few moments, the status turns green, indicating the library built successfully.

![22](/images/L780_image22.png)

### Validate your rule
To validate that your rule is working as expected, reload your sample page. If you look at the Developer Tools > Network tab, you should see a 200 response for your Launch Library.

![23](/images/L780_image23.png)

You have created your first data element and rule, and built your first Launch library.

## Use the Working Library feature

When you are making a lot of changes in Launch, it is inconvenient to have to open the Publishing tab, add changes, and build the library each time you want to see the result. After you have created your Initial Setup library, you can use the Working Library feature to rapidly save your changes and rebuild the library in a single step.

1. Make a small change to the All Pages - Library Loaded rule.
2. In the top navigation, click Rules and then click on the All Pages - Library Loaded rule to open it.

![24](/images/L780_images24.png)​

3. On the Edit Rule page, click the Select an option dropdown to show the Working Library options. Select your Initial Setup library.

![25](/images/L780_image25.png)​

After you select the library, the __Save__ button defaults to __Save to Library and Build__. When you make a change in Launch, you can use this option to automatically add the change directly to your working library and rebuild it.

4. To test this feature, open your Custom Code action and add a colon after the text "The page name is" so the entire code block reads:

```
console.log('The page name is: ' + _satellite.getVar('Page Name'));
```

5. Save the code, keep the changes in the action, and click __Save to Library and Build__.

![26](/images/L780_image26.png)​

6. Wait a moment until the green status reappears next to the Working Library dropdown, then reload your sample page. You should see your change reflected in the console message. (You might need to clear your browser cache and reload to see the change to the page.

This is a much faster way of working. The rest of the implementation tutorials use this approach.

## Install Context Hub

When we originally setup our data element, we had to ensure that the same syntax created in code was repeated in the data element.  If there was a typo in either the data layer or the creation the data element the the data element would cease to work and the rule using that data element would stop functioning.  This tightly coupled setup is something that should be avoided.  

The context hub was initially built to integrate Launch, Analytics and Experience Manager, however, the same functionality can be used outside of AEM.

__Objective__
At the end of this tutorial, you will be able to:
* Create a schema from a data layer
* Use that schema in a data element

1. Go to __Extensions > Catalog__ and locate the Context Hub extension.
2. Click __Install__.
3. Click __Configure__ on the Context Hub Extension.
4. In the configuration section choose __Customized ContextHub Data Layer__ and enter your the root of the data layer JavaScript object.

```
window.digitalData
``` 

![Context Hub](/images/contexthub1.png)

__Note:__ This will tell the ContextHub Launch extension where within the current instance of the webpage to find the data layer object instatiated.

5. Click __</> Open Editor__

![Context Hub](/images/contexthub2.png)

In the editor we want to paste the schema of our data layer.  To create a schema based on a JSON object let's use [an online json-to-schema converter](https://www.liquid-technologies.com/online-json-to-schema-converter).

6. Copy the data layer object below and paste it into the converter and click Generate Schema.

```
{
    pageInstanceID: "[Unique ID Include Environment]",
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
}
```

__Note:__ The object above is the same object from the earlier exercise without the details declaring the object equal to a variable.  A schema is a description of the data and the data model.  By providing the extention with the schema we are simply telling it what data is available and how it is structured.

![JSON Converter](/images/JSONConverter.png)

7. Copy the newly generated schema into the extension.  Navigate back to the extension and paste schema into the extension's editor.

![Schema](/images/schema.png)

8. Click __Save__ and __Save to Build the Library__.

### Edit Data Element

1. Navigate to Data Elements and into the Page Name data element.

2. Change the __Extension Type__ to __Adobe ContextHub__.

3. Select __Data Element Type__ to __Context Hub__.

4. Select `page.pageInfo` in __Data item__.

![Edit Data Element](/images/pageName.png)

5. Click __Save to Build Library__.

## Publish to Staging

After you have created and validated your library in the Development environment, it is time to publish it to Staging.

1. Go to the Publishing page.

2. Open the drop down next to your library and select Submit for Approval.

![28](/images/L780_image28.png)

3. Click Submit. Your library appears in the Submitted column in an unbuilt state.

4. Open the drop down and select Build for Staging.

![29](/images/L780_image29.png)

Once the green-dot icon appears, the library can be previewed in the Staging environment.

In a real-life scenario, the next step in the process would typically be to have your QA team validate the changes in the Staging library. They can do this using the Debugger.

## Validate the changes in the Staging library

1. In your Launch property, open the Environments page.

2. In the Staging row, click the __Install__ icon.

![30](/images/L780_image30.png)

3. Click the __Copy__ icon to copy the embed code to your clipboard, then click __Close__.

![31](/images/L780_image31.png)

4. Open the [our demo site](http://127.0.0.1:8887/) in your Chrome browser.

5. Open the [Experience Cloud Debugger extension](https://chrome.google.com/webstore/detail/adobe-experience-cloud-de/ocdmogmohccmeicdhlhhgepeaijenapj).

![32](/images/L780_image32.png)

6. Open the Tools tab and click __Adobe Launch > Dynamically Insert Launch > Embed Code__ to open the text input field (it might currently have the URL of your Development embed code):

![33](/images/L780_image33.png)

7. Paste the Staging embed code that is in your clipboard, then click the disk icon to save.

![34](/images/L780_image34.png)

8. Reload and check the Summary tab of the Debugger. Under the Launch section, you should see that your Staging Property is implemented, showing your property name (for example, "Launch Tutorial" or whatever you named your property).

![35](/images/L780_image35.png)

In real life, once your QA team has signed off by reviewing the changes in the Staging environment, it is time to publish to production.

## Publish to Production

1. Go to the Publishing page, then from the dropdown, click __Approve for Publishing__:

![36](/images/L780_image36.png)



<!--

What the capabilities are???
Trigger something??
Browse abandon ...
Action ...
REACT ... 

-->

