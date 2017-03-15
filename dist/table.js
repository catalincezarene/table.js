var Table = (function () {
'use strict';

var attachEventListener = (function (element, props, obj, payload) {
    if (props.addEventListener.length < 1) {
        return false;
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

    var processPayload = function processPayload(element, props) {
        if (props['body'].length > 1) {
            props.payload.forEach(function (payload) {
                props['body'].forEach(function (body) {
                    element.appendChild(body.toNode(props, [payload]));
                });
            });
        } else {
            Object.values(props['body']).forEach(function (body) {
                element.appendChild(body.toNode(props, props.payload));
            });
        }
    };

    props = Object.assign({
        tagName: 'table',
        addEventListener: [],
        afterCreateElement: function afterCreateElement(element, props, obj, payload) {},
        attachEventListener: attachEventListener,
        processPayload: processPayload,
        toNode: toNode
    }, props);

    return {
        define: function define(name, stack) {
            props[name] = props[name] || {};
            stack.forEach(function (obj) {
                if (obj.hasOwnProperty('getName')) {
                    props[name][obj.getName()] = obj;
                }
            });
        },
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
        payload.forEach(function (payload) {
            Object.values(props.row).forEach(function (name) {
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
        props.data = props.data || [];
        (props.data.length < 1 ? Object.keys(obj['data']) : Object.values(props.data)).forEach(function (name) {
            element.appendChild(obj['data'][name].toNode(obj, payload));
        });
    };

    props = Object.assign({
        tagName: 'tr',
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
