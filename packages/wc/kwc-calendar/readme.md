# kwc-calendar

kwc-calendar is a lightweight web component for date selection.
It relies on the native Intl.DateTimeFormat API for localization, including correct week start days for different locales.
The component supports navigation across months, years, and decades, and exposes many shadow DOM parts for full styling flexibility.

## Properties

| Property | Attribute | Description                                                                                                                   | Type             | Default |
| -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| `locale` | `locale`  | `Defines the locale used for text and the first day of the week. Falls back to the browser’s current locale if not provided.` | `string`         | `null`  |
| `value`  | `value`   | `Currently selected date. Accepts either a Date object or a string.`                                                          | `Date \| string` | `null`  |

## Events

| Event          | Description                                 | Type                                                                                |
| -------------- | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| `valueChanged` | `Fired whenever the selected date changes.` | `CustomEvent<{ localization: KwcDateLocalization; kwcDate: KwcDate; date: Date; }>` |

---

## Styling Example

```css
@mixin calendar() {
  min-width: 280px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 8px;

  background-color: #ffffff;

  &::part(calendar-header) {
    padding: 0 24px;
    margin-bottom: 12px;
  }

  &::part(calendar-nav) {
    color: $primary-color;
  }

  &::part(calendar-nav-arrow) {
    border-radius: 50%;
    aspect-ratio: 1/1;
    border: none;
    color: $primary-color;
    background-color: transparent;
    width: 24px;
    height: 24px;

    &:hover {
      background-color: rgba(3, 169, 244, 0.24);
    }
  }

  & [slot^='arrow'] {
    color: $primary-color;
  }

  &::part(calendar-nav-ym-wrapper) {
    color: $text-primary-color;
    gap: 8px;
  }

  &::part(calendar-nav-month),
  &::part(calendar-nav-year) {
    @include font-body-sm();
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;

    &:hover {
      background-color: rgba(3, 169, 244, 0.24);
    }
  }

  .arrowIcon {
    color: $primary-color;
  }

  @include calendar-view('day');
  @include calendar-view('month');
  @include calendar-view('year');
}

@mixin calendar-view($view) {
  &::part(calendar-#{$view}s-view) {
    gap: 2px;
  }

  &::part(calendar-#{$view}) {
    @include font-body-sm();
    width: 100%;
    color: $text-primary-color;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgba(3, 169, 244, 0.24);
    }
  }

  &::part(calendar-#{$view}--current) {
    border: 2px solid $primary-color;
  }

  &::part(calendar-#{$view}--selected) {
    background-color: $primary-color;
    color: $button-text-primary-color;

    &:hover {
      background-color: $primary-color;
      color: $button-text-primary-color;
    }
  }

  @if $view == 'day' {
    &::part(calendar-weekday) {
      color: $text-primary-color;
    }

    &::part(calendar-#{$view}) {
      width: 32px;
    }

    &::part(calendar-#{$view}--out-of-month) {
      opacity: 0.5;
    }
    &::part(calendar-#{$view}--selected) {
      opacity: 1;
    }
  }
}
```

_Built with [StencilJS](https://stenciljs.com/)_
