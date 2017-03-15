export default (element, props, obj, payload) => {
    if (props.addEventListener.length < 1) {
        return false;
    }
    props.addEventListener.forEach(param => {
        element.addEventListener(param.type, param.listener, param.useCapture || false);
    });
}
