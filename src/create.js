import attachEventListener from './util/attach-event-listener';
import toNode from './util/to-node';

let Create = (props = {}) => {
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

    props = Object.assign({
        tagName: 'table',
        addEventListener: [],
        afterCreateElement: (element, props, obj, payload) => {
        },
        attachEventListener,
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
