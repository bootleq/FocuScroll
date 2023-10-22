CHANGES
=======

## 1.1.0 (2023-10-23)

* Fix regression for small cross-origin &lt;iframe&gt;. By detecting "preview" frame more strictly.
* Focus big &lt;frame&gt; in deprecated &lt;frameset&gt; pages.
* Fix test cases not run completely.

## 1.0.0 (2023-10-11)

* Focus skipped &lt;iframe&gt; (due to same origin policy) if can't find any target.
  Example case: blogger.com's post preview screen.

## 0.0.1 (2023-03-09)

* Initial revision.
