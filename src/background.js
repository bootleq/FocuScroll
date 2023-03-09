import browser from 'webextension-polyfill';
import focus from '!./focus-scroll-content';

async function onExecute(tab) {
  try {
    await browser.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
      func: focus,
      args: [{verbose: true}]
    });
  } catch (err) {
    console.error('[FocuScroll]', `Failed to execute: ${err}`);
  }
}

browser.action.onClicked.addListener(onExecute);
