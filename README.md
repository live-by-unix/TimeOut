# TimeOut

TimeOut is a lightweight, fast, and reliable server status badge that can be embedded into any website with a single script tag. It requires no CORS configuration and provides a simple way to monitor the availability of your server directly from your website.

This README covers CDN usage, configuration options, local installation, the tech stack, licensing information, and a widget preview.

## Features

* Lightweight and dependency-free
* No CORS configuration required
* One-line installation
* Customizable position, theme, and size
* Adjustable ping interval
* Self-hostable
* Works in all modern browsers

## Installation

### CDN

Add the following script tag anywhere in your `<head>` or `<body>`:

```html
<script src="https://timeoutbadge.pages.dev/timeout.js"
        data-url="https://yourserver.com"></script>
```

This is the minimum required configuration.

## Configuration

### Available Attributes

| Attribute       | Required | Default        | Description                                   |
| --------------- | -------- | -------------- | --------------------------------------------- |
| `data-url`      | Yes      | —              | URL to monitor.                               |
| `data-position` | No       | `bottom-right` | Controls where the badge appears on the page. |
| `data-theme`    | No       | `auto`         | Controls the badge theme.                     |
| `data-size`     | No       | `md`           | Controls the badge size.                      |
| `data-interval` | No       | `4000`         | Ping interval in milliseconds.                |

### `data-position`

Determines where the badge appears.

Supported values:

* `top-left`
* `top-right`
* `bottom-left`
* `bottom-right`

### `data-theme`

Controls the badge appearance.

Supported values:

* `auto` — Uses the operating system theme.
* `light` — Forces the light theme.
* `dark` — Forces the dark theme.

### `data-size`

Controls the badge size.

Supported values:

* `sm` — Small
* `md` — Medium
* `lg` — Large

### `data-interval`

Sets how often the server is checked.

Example:

```html
data-interval="3000"
```

This checks the server every 3 seconds.

### Full Configuration Example

```html
<script src="https://timeoutbadge.pages.dev/timeout.js"
        data-url="https://yourserver.com"
        data-position="top-left"
        data-theme="dark"
        data-size="lg"
        data-interval="3000"></script>
```

## Local Installation

Download the latest release from this repository and include the files in your project:

```html
<link rel="stylesheet" href="timeout.css">

<script src="timeout.js"
        data-url="https://yourserver.com"></script>
```

## Tech Stack

TimeOut is built with:

* HTML
* CSS
* JavaScript

## Browser Support

TimeOut works in all modern browsers, including:

* Google Chrome
* Mozilla Firefox
* Microsoft Edge
* Safari
* Any modern browser that supports JavaScript, CSS, and HTML

## Preview

<img width="358" height="337" alt="TimeOut Widget Preview" src="https://github.com/user-attachments/assets/7c635db6-67c3-4104-9435-21382cbe4f7e" />

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
