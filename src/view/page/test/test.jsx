import React from 'react'
import './test.less'
import img3D from './img3D'
const imgs = require('./1.png')
class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    showImg() {
        let opt = {
            url: imgs,
            id: 'imgWrapper',
            lables: [{ position: { lon: 114, lat: 8 }, text: '樱花树下' }]
        }
        img3D.render(opt)
    }

    render() {
        return (
            <div className="img-box">
                <div className="imgWrapper" id="imgWrapper"></div>
            </div>
        );
    }

    componentDidMount() {
        this.showImg();
    }
}

export default Test