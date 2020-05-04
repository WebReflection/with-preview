# with-preview

[Live demo](https://webreflection.github.io/with-preview/test/)

<sup>**Photo by [Pierre Bouillot](https://unsplash.com/@pbouillot) on [Unsplash](https://unsplash.com/)**</sup>

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
