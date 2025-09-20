# kwc-popup



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description | Type      | Default |
| --------- | ---------- | ----------- | --------- | ------- |
| `inline`  | `inline`   |             | `boolean` | `false` |
| `offsetY` | `offset-y` |             | `number`  | `0`     |


## Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `closed` |             | `CustomEvent<any>` |
| `opened` |             | `CustomEvent<any>` |


## Methods

### `adjustWidth(adjustWidthEl: HTMLElement) => Promise<void>`



#### Parameters

| Name            | Type          | Description |
| --------------- | ------------- | ----------- |
| `adjustWidthEl` | `HTMLElement` |             |

#### Returns

Type: `Promise<void>`



### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `isOpen() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `open(anchorEl: HTMLElement) => Promise<void>`



#### Parameters

| Name       | Type          | Description |
| ---------- | ------------- | ----------- |
| `anchorEl` | `HTMLElement` |             |

#### Returns

Type: `Promise<void>`



### `registerCloseOutside(closeOutsideEl: HTMLElement) => Promise<void>`



#### Parameters

| Name             | Type          | Description |
| ---------------- | ------------- | ----------- |
| `closeOutsideEl` | `HTMLElement` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
