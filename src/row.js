let Row = (props = {}) => {
    let elementModifier = (element, props, obj, payload) => {
        if (props.afterCreateElement) {
            props.afterCreateElement(element, props, obj, payload);
        }

        if (props.addEventListener) {
            props.addEventListener.forEach(param => {
                element.addEventListener(param.type, param.listener, param.useCapture || false);
            });
        }
    };

    let processPayload = (element, props, obj, payload) => {
        props.data = props.data || [];
        (props.data.length < 1 ? Object.keys(obj['data']) : Object.values(props.data)).forEach(name => {
            element.appendChild(obj['data'][name].toNode(obj, payload));
        });
    };

    let toNode = (props, obj, payload) => {
        let element;
        element = document.createElement('tr');
        props.elementModifier(element, props, obj, payload);
        props.processPayload(element, props, obj, payload);
        return element;
    };

    props = Object.assign({
        elementModifier,
        processPayload,
        toNode
    }, props);

    return {
        getName() {
            return props.name;
        },
        toNode(obj, payload) {
            return props.toNode(props, obj, payload);
        }
    }
};

export default Row;
