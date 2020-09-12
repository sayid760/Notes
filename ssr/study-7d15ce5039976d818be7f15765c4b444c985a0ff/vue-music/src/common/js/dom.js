export function addClass(el, className) {
  if (hasClass(el, className)) return;
  let classNames = el.className.split(' ');
  classNames.push(className);
  el.className = classNames.join(' ');
}

function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

export function getData(el, name, value) {
  let dn = `data-${name}`;
  if (value) {
    return el.setAttribute(dn, value);
  } else {
    return el.getAttribute('data-index');
  }
}
