'use strict';
/*! (c) Andrea Giammarchi @webreflection */
const css = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('ustyler'));

const {customElements, getComputedStyle, IntersectionObserver} = window;
const className = 'with-preview';

if (!customElements.get(className)) {
  const updateSrc = target => {
    target.src = target.src.replace(/\.preview(\.jpe?g(?:\?.*)?)$/, '$1');
  };
  let onConnected = updateSrc;
  if (IntersectionObserver) {
    const once = {once: true};
    const onload = ({target}) => {
      target.addEventListener('transitionend', onTransitionEnd, once);
      target.style.opacity = 1;
    };
    const onHeight = ({target}) => {
      const {parentElement} = target;
      if (parentElement.tagName.toLowerCase() === className) {
        const {width, height} = getComputedStyle(target);
        parentElement.style.cssText +=
          ';width:' + width +
          ';height:' + height
        ;
        observer.observe(target.nextSibling);
      }
    };
    const onTransitionEnd = ({target}) => {
      const {parentElement} = target;
      parentElement.parentElement.replaceChild(target, parentElement);
    };
    const observer = new IntersectionObserver(
      entries => {
        for (let i = 0, {length} = entries; i < length; i++) {
          const {isIntersecting, target} = entries[i];
          if (isIntersecting) {
            observer.unobserve(target);
            target.addEventListener('load', onload, once);
            updateSrc(target);
          }
        }
      },
      {
        threshold: .2
      }
    );
    onConnected = target => {
      if (!target.dataset.preview) {
        target.dataset.preview = 1;
        const {
          marginTop,
          marginRight,
          marginBottom,
          marginLeft
        } = getComputedStyle(target);
        const {height, parentElement} = target;
        const container = document.createElement(className);
        const clone = target.cloneNode(true);
        container.style.cssText =
          ';margin-top:' + marginTop +
          ';margin-right:' + marginRight +
          ';margin-bottom:' + marginBottom +
          ';margin-left:' + marginLeft
        ;
        parentElement.replaceChild(container, target);
        container.appendChild(target);
        container.appendChild(clone);
        if (height)
          onHeight({target});
        else
          target.addEventListener('load', onHeight, once);
      }
    };
    css(
      className + '{position:relative;display:inline-block;padding:0;}' +
      className + '>img{position:absolute;top:0;left:0;margin:0;}' +
      className + '>img:last-child{opacity:0;transition:opacity 1s ease-in;will-change:opacity;}'
    );
  }
  customElements.define(
    className,
    class extends HTMLImageElement {
      connectedCallback() {
        onConnected(this);
      }
    },
    {extends: 'img'}
  );
}
