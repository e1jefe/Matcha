import React, { Component } from 'react';
import './.css';
import { Avatar, Badge } from 'antd';
import 'antd/dist/antd.css';
import { Progress } from 'antd';
import { Alert } from 'antd';
import { Tag } from 'antd';
import { Carousel } from 'antd';
import { Badge } from 'antd';
import { Upload, Icon, Modal } from 'antd';
import { Rate } from 'antd';
import { DatePicker } from 'antd';




// // avatar with notification red point
// ReactDOM.render(
//     <div>
//     <span style={{ marginRight: 24 }}>
//       <Badge count={1}><Avatar shape="square" icon="user" /></Badge>
//     </span>
//         <span>
//       <Badge dot><Avatar shape="square" icon="user" /></Badge>
//     </span>
//     </div>,
//     mountNode);
//
//
// // progress bar
// ReactDOM.render(<Progress type="dashboard" percent={75} />, mountNode);
//
// //beautiful alerts
//
// ReactDOM.render(
//     <div>
//         <Alert
//             message="Success Text"
//             description="Success Description Success Description Success Description"
//             type="success"
//         />
//         <Alert
//             message="Info Text"
//             description="Info Description Info Description Info Description Info Description"
//             type="info"
//         />
//         <Alert
//             message="Warning Text"
//             description="Warning Description Warning Description Warning Description Warning Description"
//             type="warning"
//         />
//         <Alert
//             message="Error Text"
//             description="Error Description Error Description Error Description Error Description"
//             type="error"
//         />
//     </div>,
//     mountNode);
//
// //tags
//
// ReactDOM.render(
//     <div>
//         <h4 style={{ marginBottom: 16 }}>Presets:</h4>
//         <div>
//             <Tag color="magenta">magenta</Tag>
//             <Tag color="red">red</Tag>
//             <Tag color="volcano">volcano</Tag>
//             <Tag color="orange">orange</Tag>
//             <Tag color="gold">gold</Tag>
//             <Tag color="lime">lime</Tag>
//             <Tag color="green">green</Tag>
//             <Tag color="cyan">cyan</Tag>
//             <Tag color="blue">blue</Tag>
//             <Tag color="geekblue">geekblue</Tag>
//             <Tag color="purple">purple</Tag>
//         </div>
//         <h4 style={{ margin: '16px 0' }}>Custom:</h4>
//         <div>
//             <Tag color="#f50">#f50</Tag>
//             <Tag color="#2db7f5">#2db7f5</Tag>
//             <Tag color="#87d068">#87d068</Tag>
//             <Tag color="#108ee9">#108ee9</Tag>
//         </div>
//     </div>,
//     mountNode);
//
//
// //carousel for photos
// function onChange(a, b, c) {
//     console.log(a, b, c);
// }
//
// ReactDOM.render(
//     <Carousel afterChange={onChange}>
//         <div><h3>1</h3></div>
//         <div><h3>2</h3></div>
//         <div><h3>3</h3></div>
//         <div><h3>4</h3></div>
//     </Carousel>,
//     mountNode);
//
//
// //upload photo with mini gallery
//
// class PicturesWall extends React.Component {
//     state = {
//         previewVisible: false,
//         previewImage: '',
//         fileList: [{
//             uid: -1,
//             name: 'xxx.png',
//             status: 'done',
//             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//         }],
//     };
//
//     handleCancel = () => this.setState({ previewVisible: false })
//
//     handlePreview = (file) => {
//         this.setState({
//             previewImage: file.url || file.thumbUrl,
//             previewVisible: true,
//         });
//     }
//
//     handleChange = ({ fileList }) => this.setState({ fileList })
//
//     render() {
//         const { previewVisible, previewImage, fileList } = this.state;
//         const uploadButton = (
//             <div>
//                 <Icon type="plus" />
//                 <div className="ant-upload-text">Upload</div>
//             </div>
//         );
//         return (
//             <div className="clearfix">
//                 <Upload
//                     action="//jsonplaceholder.typicode.com/posts/"
//                     listType="picture-card"
//                     fileList={fileList}
//                     onPreview={this.handlePreview}
//                     onChange={this.handleChange}
//                 >
//                     {fileList.length >= 3 ? null : uploadButton}
//                 </Upload>
//                 <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
//                     <img alt="example" style={{ width: '100%' }} src={previewImage} />
//                 </Modal>
//             </div>
//         );
//     }
// }
//
// ReactDOM.render(<PicturesWall />, mountNode);
//
// // stars for rate
//
// ReactDOM.render(<Rate disabled defaultValue={2} />, mountNode);
//
// // date picker for birthday
//
// function onChange(date, dateString) {
//     console.log(date, dateString);
// }
//
// ReactDOM.render(
//     <div>
//         <DatePicker onChange={onChange} />
//     </div>,
//     mountNode);