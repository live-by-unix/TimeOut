## Welcome to the TimeOut Project.   
TImeOut is a fast, easy, no-cors, and reliable server ping widget which is easily embedable with a single '<script>' tag. 
**This README covers CDN, configurations, local installation, and tech stack. Also covers licensing.**

## CDN
The cdn link is https://timeoutbadge.pages.dev/ and in order to implement the badge, try out this bare bones code in the '<head>' or '<body>' part of your website. 
```js
<script src="https://timeoutbadge.pages.dev/timeout.js"
        data-url="https://yourserver.com"></script>
```
That is a bare bones implementation. 

## Configurations
Required config:
* data-url.
The data-url config sets the exact URL timeout pings for.
Not required config:
* data-position
The data-position arguement is the placement of the badge. The different placements are:
* top-left
* top-right
* bottom-left
* bottom-right

* data-theme

data-theme is the color of the widget. If you have data-theme set to auto, it will defualt to OS defualt. If you set it to light or dark, it will override the color into light or dark.
* data-size
It is a arguement for the size of the badge, with sm for small, md for medium, and lg for large.
* data-interval
The defualt interval for pinging (in ms). The defualt is 4000 ms.

A code block with all this config would look like
```js
<script src="https://timeoutbadge.pages.dev/timeout.js"
        data-url="https://yourserver.com"
        data-position="top-left"
        data-theme="dark"
        data-size="lg"
        data-interval="3000"></script>
```
## Local installation
To have a local installation, download the latest release from this repo, and then, a bare bones implementation would be
```js
<link rel="stylesheet" href="timeout.css">
<script src="timeout.js" data-url="https://yourserver.com"></script>
```
## Tech stack 
* CSS
* HTML
* JS

## Licensing
MIT License. 
