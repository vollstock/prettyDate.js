# PrettyDate

A small helper function to beautify dates in Javascript.

## Usage and Examples

Pretty date only has one function: ```prettyDate(date)```. It feeds 
the input date into a [Javascript Date object](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date) and all the same input formats, the Date object does.

It returns a pretty string.

Include it to your doc

```html
<script src="prettyDate.min.js"></script>
```

Then simply prettify your javascript dates

```javascript
prettyDate(new Date());   // --> "Just now"
prettyDate("1979-08-31"); // --> "Aug 31st 1979"
```

## License

It’s [Beerware](https://en.wikipedia.org/wiki/Beerware).
