import { Modal, Upload } from 'antd';
import React from 'react';
import { notify } from '../notification';
import PropTypes from 'prop-types';
import { InboxOutlined } from '@ant-design/icons';
import { baseUrl, UPLOAD_FILE_NAME_IN_REQUEST } from '../config';

const { Dragger } = Upload;

// This is a popup component that contains a upload component. 
// After a successful upload, the url of file will be passed to the callback function.
// The callback function has to be async.

class UploadPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {

    const { loading } = this.state;
    const { title, visible, callback, onCancel } = this.props;

    const dragProps = {
      name: UPLOAD_FILE_NAME_IN_REQUEST,
      multiple: false,
      action: `${baseUrl}/api/upload_image`,
      onChange(info) {
        const { status } = info.file;
        if (status === 'done') {

          const url = info.file.response.Location;
          notify('success', `${info.file.name} file uploaded successfully.`);
          callback({value: url}); // pass the newly generated url back to template insert handler
          onCancel();
        } else if (status === 'error') {
          notify(
            'error', 
            `${info.file.name} file upload failed.`,
            info.file.response
          );
          
        }
      },
    };

    return (
        <Modal
          title={title}
          visible={visible}
          loading={loading}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Dragger {...dragProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag picture file to this area to upload</p>
            <p className="ant-upload-hint">
              Support file type: png, jpg, jpeg, gif, bmp, webp
            </p>
          </Dragger>
        </Modal>
    );
  }
}

UploadPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,   
  afterSuccess: PropTypes.func, 
  maxLength: PropTypes.number,
  onCancel: PropTypes.func.isRequired,
};

UploadPopup.defaultProps = {
  title: '',   
  afterSuccess: () => {},  
  maxLength: 1000,
}

export default UploadPopup;