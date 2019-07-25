/* eslint-disable */
import React , { Component } from 'react';
export default function (loading) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                Com: null
            };
        };
        //即使是同步的话执行的也是promise.resolve这个方法，将同步代码包装一层，进行同步        
        //await后面接收的是值或promise    
        async componentWillMount() {
            let Com = await loading();   //依次执行，只有一个await往下走，Com是有值的        
            this.setState({
                Com: Com.default ? Com.default : null
            });
        };
        render() {
            let Com = this.state.Com;
            return Com ? <Com /> : null;
        }
    }
}
