import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {
  DragDropContext as dragDropContext,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Random } from 'meteor/random';
import FileItem from './FileItem';
import getSignedUrl from './aws';

class DropzoneComponent extends Component {
  static defaultProps = {
    multiple: true,
    maxFiles: 5,
    dropzoneText: 'Drop files here',
    dropBtnText: 'Select files',
  };
  static propTypes = {
    files: PropTypes.array, //eslint-disable-line
    onChange: PropTypes.func, //eslint-disable-line
    accept: PropTypes.string, //eslint-disable-line
    multiple: PropTypes.bool,
    maxFiles: PropTypes.number,
    onError: PropTypes.func, //eslint-disable-line
    dropzoneText: PropTypes.string,
    dropBtnText: PropTypes.string,
  };
  constructor(props = {}) {
    super(props);
    const files = props.files || [];
    this.state = {
      files: files.map(file => ({
        preview: file,
        name: file,
        url: file,
        id: Random.id(),
      })),
    };
    this.onDrop = this.onDrop.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
    this.moveFile = this.moveFile.bind(this);
  }

  onDrop(files) {
    if (this.state.files.length === this.props.maxFiles) {
      if (this.props.onError) {
        this.props.onError('maximum number of files exceeded!');
      }
    } else {
      const filesToUpload = files.map(file => ({
        preview: file.preview,
        name: file.name,
        id: Random.id(),
        isUploading: true,
        file,
      }));

      this.setState({
        files: [
          ...this.state.files,
          ...filesToUpload,
        ],
      });

      filesToUpload.forEach(file => this.upload(file));
    }
  }

  onOpenClick() {
    this.dropzone.open();
  }

  updateFiles(commands) {
    const files = update(this.state.files, commands);
    this.setState({ files });
    if (this.props.onChange) {
      this.props.onChange(files.filter(file => !!file.url));
    }
  }

  reupload(file) {
    const { files } = this.state;
    const index = files.findIndex(item => item.id === file.id);
    this.updateFiles({
      $splice: [
        [index, 1, {
          ...files[index],
          uploadFailed: false,
          isUploading: true,
        }],
      ],
    });
    this.upload(file);
  }

  upload(fileObject) {
    const file = fileObject.file;
    getSignedUrl(file.name, file.type).then(
      (signedUrl) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
        return axios.put(signedUrl, file, options);
      },
    ).then(
      (result) => {
        const responseUrl = result.request.responseURL;
        const url = responseUrl.substr(0, responseUrl.indexOf('?'));
        const { files } = this.state;
        const index = files.findIndex(item => item.id === fileObject.id);
        this.updateFiles({
          $splice: [
            [index, 1, {
              ...files[index],
              isUploading: false,
              url,
              uploadFailed: false,
            }],
          ],
        });
      },
    ).catch(
      () => {
        const { files } = this.state;
        const index = files.findIndex(item => item.id === fileObject.id);
        this.updateFiles({
          $splice: [
            [index, 1, {
              ...files[index],
              isUploading: false,
              url: '',
              uploadFailed: true,
            }],
          ],
        });
        if (this.props.onError) {
          this.props.onError('Upload Failed!');
        }
      },
    );
  }

  remove(fileId) {
    const index = this.state.files.findIndex(file => file.id === fileId);
    if (index !== -1) {
      this.updateFiles({
        $splice: [[index, 1]],
      });
    }
  }

  moveFile(a, b) {
    this.updateFiles({
      $splice: [
        [a, 1, this.state.files[b]],
        [b, 1, this.state.files[a]],
      ],
    });
  }

  render() {
    const { accept, multiple, dropzoneText, dropBtnText } = this.props;
    return (
      <Dropzone
        ref={(dropzone) => { this.dropzone = dropzone; }}
        onDrop={this.onDrop}
        accept={accept}
        disableClick
        multiple={multiple}
        style={{
          borderRadius: 4,
          border: '2px dashed #eee',
          padding: 10,
          margin: 10,
          position: 'relative',
          maxWidth: 960,
        }}
        activeStyle={{
          border: '2px dashed #23ccef',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <h5>{dropzoneText}</h5>
          <div className="text-muted" style={{ marginBottom: 15 }}>
            OR
          </div>
          <RaisedButton
            label={dropBtnText}
            onTouchTap={this.onOpenClick}
          />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="row">
            {this.state.files.map((file, i) => (
              <div
                key={file.id}
                className="col-md-3 col-lg-3 col-sm-3 col-xs-6"
                style={{
                  margin: '5px 0',
                }}
              >
                <FileItem
                  index={i}
                  name={file.name}
                  preview={file.preview}
                  moveFile={this.moveFile}
                  isUploading={file.isUploading}
                  uploadFailed={file.uploadFailed}
                  onReupload={() => this.reupload(file)}
                  onRemove={() => this.remove(file.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </Dropzone>
    );
  }
}

export {
  DropzoneComponent as DropzoneBare,
};
export default dragDropContext(HTML5Backend)(DropzoneComponent);
