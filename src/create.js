import attachEventListener from './util/attach-event-listener';
import toNode from './util/to-node';

let Create = (props = {}) => {
    let define = (name, stack) => {
        props[name] = props[name] || {};
        stack.forEach(obj => {
            if (obj.hasOwnProperty('getName')) {
                props[name][obj.getName()] = obj;
            }
        });
    };

    let processPayload = (element, props) => {
        let bodyValue = Object.values(props['body']);
        if (!props.bodyAsRow) {
            element.appendChild(bodyValue[0].toNode(props, props.payload));
            return;
        }
        props.payload.forEach(payload => {
            bodyValue.forEach(body => {
                element.appendChild(body.toNode(props, [payload]));
            });
        });
    };

    props = Object.assign({
        tagName: 'table',
        payload: [],
        bodyAsRow: false,
        addEventListener: [],
        afterCreateElement: (element, props, obj, payload) => {
        },
        attachEventListener,
        processPayload,
        toNode
    }, props);

    return {
        define,
        withPayload(payload) {
            props.payload = payload;
        },
        toNode() {
            return props.toNode(props);
        }
    }
};

export default Create;