import attachEventListener from './util/attach-event-listener';
import toNode from './util/to-node';

let Data = (props = {}) => {
    let processPayload = (element, props, obj, payload) => {
        element.innerText = payload[props['name']];
    };

    props = Object.assign({
        tagName: 'td',
        addEventListener: [],
        afterCreateElement: (element, props, obj, payload) => {
        },
        attachEventListener,
        processPayload,
        toNode,
    }, props);

    return {
        getName() {
            return props.name;
        },
        toNode(obj, payload) {
            return props.toNode(props, obj, payload);
        }
    };
};

export default Data;