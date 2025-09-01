# kwc-date-picker



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description | Type                                                                               | Default     |
| -------------------- | ----------------------- | ----------- | ---------------------------------------------------------------------------------- | ----------- |
| `adjustPopupToInput` | `adjust-popup-to-input` |             | `boolean`                                                                          | `false`     |
| `pt`                 | `pt`                    |             | `{ calendar: { locale: string; }; popup: { offsetY: number; inline: boolean; }; }` | `undefined` |
| `value`              | `value`                 |             | `Date \| string`                                                                   | `null`      |


## Events

| Event          | Description | Type                |
| -------------- | ----------- | ------------------- |
| `valueChanged` |             | `CustomEvent<Date>` |


## Dependencies

### Depends on

- [kwc-input-group](../kwc-input-group)
- [kwc-popup](../kwc-popup)
- [kwc-calendar](../kwc-calendar)

### Graph
```mermaid
graph TD;
  kwc-date-picker --> kwc-input-group
  kwc-date-picker --> kwc-popup
  kwc-date-picker --> kwc-calendar
  style kwc-date-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
