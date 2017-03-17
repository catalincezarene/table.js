var Table = (function () {
'use strict';

var attachEventListener = (function (element, props, obj, payload) {
    if (props.addEventListener.length < 1) {
        return;
    }
    props.addEventListener.forEach(function (param) {
        element.addEventListener(param.type, param.listener, param.useCapture || false);
    });
});

var toNode = (function (props, obj, payload) {
    var element = void 0;
    element = document.createElement(props.tagName);
    if (props.afterCreateElement) {
        props.afterCreateElement(element, props, obj, payload);
    }
    props.attachEventListener(element, props, obj, payload);
    props.processPayload(element, props, obj, payload);
    return element;
});

var Create = function Create() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var define = function define(name, stack) {
        props[name] = props[name] || {};
        stack.forEach(function (obj) {
            if (obj.hasOwnProperty('getName')) {
                props[name][obj.getName()] = obj;
            }
        });
    };

    var processPayload = function processPayload(element, props) {
        var bodyValue = Object.values(props['body']);
        if (!props.bodyAsRow) {
            element.appendChild(bodyValue[0].toNode(props, props.payload));
            return;
        }
        props.payload.forEach(function (payload) {
            bodyValue.forEach(function (body) {
                element.appendChild(body.toNode(props, [payload]));
            });
        });
    };

    props = Object.assign({
        tagName: 'table',
        payload: [],
        bodyAsRow: false,
        addEventListener: [],
        afterCreateElement: function afterCreateElement(element, props, obj, payload) {},
        attachEventListener: attachEventListener,
        processPayload: processPayload,
        toNode: toNode
    }, props);

    return {
        define: define,
        withPayload: function withPayload(payload) {
            props.payload = payload;
        },
        toNode: function toNode$$1() {
            return props.toNode(props);
        }
    };
};

var Body = function Body() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var processPayload = function processPayload(element, props, obj, payload) {
        var rowName = Object.values(props.row);
        payload.forEach(function (payload) {
            rowName.forEach(function (name) {
                element.appendChild(obj['row'][name].toNode(obj, payload));
            });
        });
    };

    props = Object.assign({
        tagName: 'tbody',
        row: [],
        addEventListener: [],
        afterCreateElement: function afterCreateElement(element, props, obj, payload) {},
        attachEventListener: attachEventListener,
        processPayload: processPayload,
        toNode: toNode
    }, props);

    return {
        getName: function getName() {
            return props.name;
        },
        toNode: function toNode$$1(obj, payload) {
            return props.toNode(props, obj, payload);
        }
    };
};

var Row = function Row() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var processPayload = function processPayload(element, props, obj, payload) {
        var dataName = props.data.length > 1 ? Object.values(props.data) : Object.keys(obj['data']);
        dataName.forEach(function (name) {
            element.appendChild(obj['data'][name].toNode(obj, payload));
        });
    };

    props = Object.assign({
        tagName: 'tr',
        data: [],
        addEventListener: [],
        afterCreateElement: function afterCreateElement(element, props, obj, payload) {},
        attachEventListener: attachEventListener,
        processPayload: processPayload,
        toNode: toNode
    }, props);

    return {
        getName: function getName() {
            return props.name;
        },
        toNode: function toNode$$1(obj, payload) {
            return props.toNode(props, obj, payload);
        }
    };
};

var Data = function Data() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var processPayload = function processPayload(element, props, obj, payload) {
        element.innerText = payload[props['name']];
    };

    props = Object.assign({
        tagName: 'td',
        addEventListener: [],
        afterCreateElement: function afterCreateElement(element, props, obj, payload) {},
        attachEventListener: attachEventListener,
        processPayload: processPayload,
        toNode: toNode
    }, props);

    return {
        getName: function getName() {
            return props.name;
        },
        toNode: function toNode$$1(obj, payload) {
            return props.toNode(props, obj, payload);
        }
    };
};

var Table = {
    Create: Create,
    Body: Body,
    Row: Row,
    Data: Data
};

return Table;

}());
//# sourceMappingURL=table.js.map
