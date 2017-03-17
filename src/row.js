import attachEventListener from './util/attach-event-listener';
import toNode from './util/to-node';

let Row = (props = {}) => {
    let processPayload = (element, props, obj, payload) => {
        let dataName = props.data.length > 1 ? Object.values(props.data) : Object.keys(obj['data']);
        dataName.forEach(name => {
            element.appendChild(obj['data'][name].toNode(obj, payload));
        });
    };

    props = Object.assign({
        tagName: 'tr',
        data: [],
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