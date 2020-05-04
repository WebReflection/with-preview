# with-preview

![frozen beach](./test/with-preview.jpg)

<sup>**Photo by [Pierre Bouillot](https://unsplash.com/@pbouillot) on [Unsplash](https://unsplash.com/)**</sup>

A built-in Custom Element based on _IntersectionObserver_ able to fade in good quality jpg over their preview version.

It fallbacks all the way down to IE 9, simply replacing on the fly the preview source with its good quality counter-part.

**[Live demo](https://webreflection.github.io/with-preview/test/)**


### Example

```html
<script async src="https://unpkg.com/with-preview/es.js"></script>
<img is="with-preview" src="any-image.preview.jpg">
```

Images will drop the `.preview` part of the _src_ and will fade in the non `.preview` version of the same image once the document shows the preview, and after the non-preview version is loaded.

Previews can be manually generated or based on [µcompress](https://github.com/WebReflection/ucompress#readme) or [µcdn](https://github.com/WebReflection/ucdn#readme) previews.

```sh
# example: will create test.preview.jpg
npx ucompress --preview --source test.jpg
```
