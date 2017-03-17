# Table

Table is a JavaScript library for building html tables.

## Usage
```js
let myTable = Table.Create();

myTable.define('data', [
    Table.Data({
        name: 'id',
        afterCreateElement(element) {
            element.style.color = '#ff0000';
        }
    }),
    Table.Data({
        name: 'email',
        addEventListener: [
            {
                type: 'click',
                listener: function (event) {
                    console.log(event);
                    console.log(this);
                    console.log(this.parentNode);
                }
            }
        ]
    })
]);

myTable.define('row', [
    Table.Row({
        name: 'row',
        data: ['id', 'email']
    })
]);

myTable.define('body', [
    Table.Body({
        name: 'body',
        row: ['row']
    })
]);

myTable.withPayload([
    {"id": "1", "email": "local@host"}, 
    {"id": "2", "email": "local@email"}
]);

document.getElementById('container').appendChild(myTable.toNode());
```