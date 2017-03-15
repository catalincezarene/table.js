import attachEventListener from './util/attach-event-listener';
import toNode from './util/to-node';

let Row = (props = {}) => {
    let processPayload = (element, props, obj, payload) => {
        props.data = props.data || [];
        (props.data.length < 1 ? Object.keys(obj['data']) : Object.values(props.data)).forEach(name => {
            element.appendChild(obj['data'][name].toNode(obj, payload));
        });
    };

    props = Object.assign({
        tagName: 'tr',
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
    }
};

export default Row;
