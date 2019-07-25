import React from 'react'
import { Table, Divider, Modal } from 'antd'
import EditForm from './editForm'
import TipBox from '../../../utils/tipbox'
import { getAxios, postAxios } from '../../../utils/api'

const { confirm } = Modal;

class Tables extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            modalVisible: false,
            info: {}
        };
        this.pagination = {
            current: 0,
            pageSize: 10,
            pageSizeOptions: ['10', '15', '20', '25'],
            showQuickJumper: true,
            showSizeChanger: true,
            total: 0,
            showTotal: this.showTotal,
            onChange: this.pageChange,
            onShowSizeChange: this.pageSizeChange
        }
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'username',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
            },
            {
                title: 'Sex',
                dataIndex: 'sex',
                render: text => <span>{text === '1' ? 'man' : 'woman'}</span>
            },
            {
                title: 'Address',
                dataIndex: 'address',
            },
            {
                title: 'operations',
                dataIndex: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;" className="edit" onClick={(e) => this.editRow(record, e)}>edit</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" className="del" onClick={(e) => this.deleteRow(record, e)}>del</a>
                    </span>
                )
            }
        ];
    }
    
    showTotal = (total) => {
        return `Total ${total} items`;
    }
    pageChange = (page, pageSize) => {
        console.log(page)
    }
    pageSizeChange = (current, size) => {
        console.log(size)
    }
    deleteRow = (obj, e) => {
        confirm({
            content: <span>destroy this?</span>,
            onOk: () => {
                postAxios('/api/delUser', obj ).then( (response) => {
                    if (response.data.code === '200') {
                        TipBox.box('success', '操作成功', response.data.msg)
                        this.getList();
                    } else {
                        TipBox.box('warning', '操作失败', response.data.msg)
                    }
                }).catch(function (error) {
                    TipBox.box('warning', '操作失败', error)
                });
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }
    editRow = (obj, e) => {
        this.setState({
            modalVisible: true,
            info: obj
        });
    }
    handleaddOk = () => {
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                const params = Object.assign(this.state.info, values)
                postAxios('/api/updateUser', params ).then( (response) => {
                    if (response.data.code === '200') {
                        TipBox.box('success', '操作成功', response.data.msg)
                        this.getList();
                    } else {
                        TipBox.box('warning', '操作失败', response.data.msg)
                    }
                }).catch(function (error) {
                    TipBox.box('warning', '操作失败', error)
                });
                this.setState({
                    modalVisible: false,
                });
                this.formRef.props.form.resetFields();
            }
        });
    }
    handleaddCancel = () => {
        this.setState({
            modalVisible: false,
        });
        this.formRef.props.form.resetFields();
    }

    getList = () => {
        this.setState({
            loading: true
        });
        getAxios('/api/user', { current: this.pagination.current, pageSize: this.pagination.pageSize } ).then( (response) => {
            if (response.data.code === '200') {
                let data = response.data.data;
                data.forEach(element => {
                    element.key = element.id;
                });
                this.setState({
                    loading: false,
                    data: data
                });
            } else {
                TipBox.box('warning', '操作失败', response.data.msg)
            }
        }).catch(function (error) {
            TipBox.box('warning', '操作失败', error)
        });
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            // getCheckboxProps: record => ({
            //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //     name: record.name,
            // }),
        };

        return (
            // rowKey={record => record.key} dataSource 和 columns 里的数据值都需要指定 key 值。
            <div>
                <Table
                    loading={this.state.loading}
                    rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={this.state.data}
                    pagination={this.pagination} />
                <Modal 
                    title="title"
                    visible={this.state.modalVisible}
                    onOk={this.handleaddOk}
                    onCancel={this.handleaddCancel}>
                    <EditForm data={this.state.info} wrappedComponentRef={(inst) => this.formRef = inst} />
                </Modal>
            </div>
        );
    }
    componentDidMount() {
        this.getList();
    }
}

export default Tables