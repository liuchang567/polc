import { notification } from 'antd';

const TipBox = {

}
TipBox.box = (type, title, msg) => {
    notification[type]({
        message: title,
        description: msg,
    });
}
export default TipBox;
