export default (props, obj, payload) => {
    let element;
    element = document.createElement(props.tagName);
    if (props.afterCreateElement) {
        props.afterCreateElement(element, props, obj, payload);
    }
    props.attachEventListener(element, props, obj, payload);
    props.processPayload(element, props, obj, payload);
    return element;
};