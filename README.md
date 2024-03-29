FocuScroll
==========

Provide a browser action to find the main scrollable area,
focus it to enable page scrolling with keyboard (PageDown, PageUp, .etc).


Install
-------

- Firefox Add-ons - [addons.mozilla.org/firefox/addon/focuscroll](https://addons.mozilla.org/firefox/addon/focuscroll/)
- Chrome Web Store - [chrome.google.com/webstore/detail/focuscroll](https://chrome.google.com/webstore/detail/focuscroll/jebflmhcpmdcelkmjkklapnebmafeelm)


Detail
------

- The "main" scrollable element is determined by certain logic.

  The search begins from center of the viewport, walks toward parent elements
  to find something scrollable.

- Has some quirk operations for iframe and so on, various situations were
  demonstrated by test cases (in [public](public/) folder).

- Some debug messages will be printed to JS console when trigger the action.


Development
-----------

### Test server

Test server is used to host [test pages](public/).

Start server with:

    yarn webpack-dev-server

then open http://localhost:4444/FocuScroll/

the port can be defined by `TEST_SERVER_PORT` in `.env` file.



### Scripts

Has some scripts for development, note the names without `:chrome` imply Firefox.

Make temporary build to `build` folder:

    yarn build
    yarn build:chrome

    yarn build watch

Lint

    yarn lint
    yarn lint:ts

Unit tests

    yarn test
    yarn test --debug --project firefox

  Disclaimer: though most tests only involve localhost, there is one (`public/fullwith_iframe.html`) that has request to `raw.githubusercontent.com`, just to quickly simulate cross origin iframe.

Package a zip file:

    yarn build:prod
    yarn build:prod:chrome


Bookmarklet
-----------

Can also generate bookmarklet by running `./gen_bookmarklet.js`.


