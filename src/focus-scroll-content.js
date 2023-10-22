const wrap = ({
  verbose = false
} = {}) => {

  let skippedFrame = null;

  const log = (...args) => {
    verbose && console.log('[FocuScroll]', ...args);
  };

  const FOCUS_OPTIONS = {
    preventScroll: true,
    focusVisible: false
  }

  const findNextNode = el => {
    return el.parentElement;
  };

  const canAccept = el => {
    const styles = globalThis.getComputedStyle(el);
    log('testing:', el, styles.overflowY);

    if (/auto|scroll/.test(styles.overflowY)) {
      if (el.scrollHeight > el.clientHeight) {
        return true;
      }
    }

    if (el.tagName === 'FRAME' && el.clientHeight >= globalThis.innerHeight) {
      log('Found <frame> with 100% height, accept it.');
      return true;
    }

    if (el.tagName === 'HTML') {
      if (skippedFrame) {
        log('Arrive <html> while having <iframe> skipped, can try focus the iframe.');
        return false;
      }

      log('Arrive <html>, accept it (will focus its <body>).');
      return true;
    }

    return false;
  };

  const find = node => {
    while (node) {
      if (canAccept(node)) {
        return node;
      }

      node = findNextNode(node);
    }

    if (!node) {
      if (skippedFrame) {
        log('No scrolling element detected, try to focus the skipped <iframe>.');
        return skippedFrame;
      }

      console.error('No scrolling element detected.');
    }
  };

  const forceFocus = el => {
    if (!el.getAttribute('tabIndex') && el.tabIndex === -1) {
      log('Set tabIndex to make focusable.')
      el.tabIndex = -1;
      el.focus(FOCUS_OPTIONS);
      el.removeAttribute('tabIndex');
    } else {
      el.focus(FOCUS_OPTIONS);
    }
  };

  const main = () => {
    log('== START ==');

    const prevFocused = document.activeElement;
    const center = [globalThis.innerWidth / 2, globalThis.innerHeight / 2];

    let e = document.elementFromPoint(...center);

    log('prevFocused:', prevFocused);
    log('elementFromPoint center:', e);

    while (e.tagName === 'IFRAME') {
      if (e.contentDocument) {
        e = e.contentDocument.elementFromPoint(...center);
      } else { // maybe not same origin
        if (e.offsetWidth >= globalThis.innerWidth) { // only accept such full-width preview case
          skippedFrame = e;
        }
        e = e.parentElement;
        log('Skip iframe and pick its parent.');
      }
    }

    log('Initial element:', e);

    let target = find(e);

    if (target.tagName === 'HTML') {
      target = target.querySelector('body'); // workaround some browsers focus <body> when trying focus <html>
    }

    forceFocus(target);
    log('Final focused:', document.activeElement);

    log('== END ==');
  };

  try {
    main();
  } catch (error) {
    log('Error execute content script:', error);
  }
}

export default wrap;
