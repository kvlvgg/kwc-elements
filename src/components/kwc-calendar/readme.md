# kwc-calendar



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description | Type                  | Default    |
| -------------------- | ----------------------- | ----------- | --------------------- | ---------- |
| `adjustPopupToInput` | `adjust-popup-to-input` |             | `boolean`             | `false`    |
| `mode`               | `mode`                  |             | `"popup" \| "static"` | `'static'` |
| `popupOffset`        | `popup-offset`          |             | `number`              | `4`        |


## Events

| Event          | Description | Type                |
| -------------- | ----------- | ------------------- |
| `date-changed` |             | `CustomEvent<Date>` |


## Shadow Parts

| Part                       | Description |
| -------------------------- | ----------- |
| `"arrow"`                  |             |
| `"calendar-input"`         |             |
| `"calendar-input-wrapper"` |             |
| `"calendar-popup-header"`  |             |
| `"day-of-week"`            |             |
| `"header-date"`            |             |
| `"left"`                   |             |
| `"right"`                  |             |


## Dependencies

### Depends on

- [kwc-popup](../kwc-popup)

### Graph
```mermaid
graph TD;
  kwc-calendar --> kwc-popup
  style kwc-calendar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
