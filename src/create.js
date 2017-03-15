let Create = (props = {}) => {
    let elementModifier = (element, props) => {
        if (props.afterCreateElement) {
            props.afterCreateElement(element);
        }

        if (props.addEventListener) {
            props.addEventListener.forEach(param => {
                element.addEventListener(param.type, param.listener, param.useCapture || false);
            });
        }
    };

    let processPayload = (element, props) => {
        if (props['body'].length > 1) {
            props.payload.forEach(payload => {
                props['body'].forEach(body => {
                    element.appendChild(body.toNode(props, [payload]));
                });
            });
        } else {
            Object.values(props['body']).forEach(body => {
                element.appendChild(body.toNode(props, props.payload));
            });
        }
    };

    let toNode = props => {
        let element;
        element = document.createElement('table');
        props.elementModifier(element, props);
        props.processPayload(element, props);
        return element;
    };

    props = Object.assign({
        elementModifier,
        processPayload,
        toNode
    }, props);

    return {
        define(name, stack) {
            props[name] = props[name] || {};
            stack.forEach(obj => {
                if (obj.hasOwnProperty('getName')) {
                    props[name][obj.getName()] = obj;
                }
            });
        },
        withPayload(payload) {
            props.payload = payload;
        },
        toNode() {
            return props.toNode(props);
        }
    }
};

export default Create;
