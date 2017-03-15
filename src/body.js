import attachEventListener from './util/attach-event-listener';
import toNode from './util/to-node';

let Body = (props = {}) => {
    let processPayload = (element, props, obj, payload) => {
        payload.forEach(payload => {
            Object.values(props.row).forEach(name => {
                element.appendChild(obj['row'][name].toNode(obj, payload));
            });
        });
    };

    props = Object.assign({
        tagName: 'tbody',
        row: [],
        addEventListener: [],
        afterCreateElement: (element, props, obj, payload) => {
        },
        attachEventListener,
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

export default Body;
