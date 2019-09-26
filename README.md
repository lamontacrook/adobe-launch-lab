# Adobe Launch Lab

## Table of Contents
1. [Setting Up the Environment](#setup-up-the-environment)
2. [Overview](#overview)
3. [Create a Launch Property](#create-a-launch-property)

## Setting Up the Environment

In order to work with Launch and learn the basics of Tag Management and creating a data layer we first need a site to work with.  We will be using a couple sample websites that can be cloned in this repository.

You will also need a webserver to run the websites on.  For Launch to work you need a properly formed URL.  If you don't have a local webserver running on your machine I would recommend this [Chrome extension](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb).  This will allow you to browse to these local websites using your browser.  You can certainly use whatever webserver you would like as long as you can edit and change the HTML of the files.

Within this repository, you should find two directories, [/victory](https://github.com/lamontacrook/adobe-launch-lab/tree/master/victory) and [/apex-app](https://github.com/lamontacrook/adobe-launch-lab/tree/master/victory/apex-app).  These directories are the websites that we will be tagging.  If you are using [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) you will need to select these directories as we go through the labs.

Since we will be editing HTML, you will want to have an integrated development environment (IDE) installed on your computer.  I use Visual Studio Code which you can find [here](https://code.visualstudio.com/). 

For debugging purposes, let's  install two tools.  First, ensure that you have Chrome developer tools installed - https://developers.google.com/web/tools/chrome-devtools.  Additonally, install the Experience Cloud debugger - https://chrome.google.com/webstore/detail/adobe-experience-cloud-de/ocdmogmohccmeicdhlhhgepeaijenapj?hl=en.  We will be using this to debug the Experience Cloud products.

## Overview

Each lesson contains how-to exercises and foundational information to help you implement the Experience Cloud and understand its value. Callouts are provided to highlight information which might be useful to customers migrating from our older tag manager - Dynamic Tag Management. Demo sites are provided for you to complete the tutorial, so you can learn the underlying techniques in a safe environment. After completing this tutorial, you should be ready to start implementing all of your marketing solutions through Launch on your own website.

## Develop a data layer
Objective
In this lesson, you will learn some best practice for developing a data layer.

A datalayer can be anything.  It could be surface within HTML or within a JavaScript object.  The latter is the broadly accepted method for creating a data layer.  The W3C has published a standard for building a datalayer.  We will be using that for our exercise.  It is strongly advised to have a corporate standard.  
```
    <script type="text/javascript">
        var digitalData = {
            pageInstanceID: "MyHomePage-Production",
            page:{
                pageInfo: {
                    pageID: "Home Page",
                    destinationURL: "http://mysite.com/index.html"
                },
                category:{
                    primaryCategory: "FAQ Pages",
                    subCategory1: "ProductInfo",
                    pageType: "FAQ"
                },
                attributes:{
                    country: "US",
                    language: "en-US"
                }
            }
        };
    </script>
```

### Resources:
https://theblog.adobe.com/data-layers-buzzword-best-practice/
https://www.w3.org/2013/12/ceddl-201312

## Create a Launch Property

Objective
In this lesson, you will create your first Launch property.

A property is basically a container that you fill with extensions, rules, data elements, and libraries as you deploy tags to your site.

At the end of this lesson, you will be able to:
* Log into the Launch user interface
* Create a new Launch property
* Configure a Launch property