import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { findDOMNode } from 'react-dom';
import {
  DragSource as dragSource,
  DropTarget as dropTarget,
} from 'react-dnd';

/* eslint-disable jsx-a11y/href-no-hash */

const Types = {
  FILE: 'file',
};

const fileSource = {
  beginDrag(props) {
    return { index: props.index };
  },
};

const fileTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); //eslint-disable-line

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveFile(dragIndex, hoverIndex);

    // eslint-disable-next-line
    monitor.getItem().index = hoverIndex;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class File extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    index: PropTypes.number.isRequired, //eslint-disable-line
    preview: PropTypes.string, //eslint-disable-line
    isUploading: PropTypes.bool, //eslint-disable-line
    uploadFailed: PropTypes.bool, //eslint-disable-line
    onReupload: PropTypes.func, //eslint-disable-line
    onRemove: PropTypes.func, //eslint-disable-line
  };
  render() {
    const {
      preview,
      connectDragSource,
      connectDropTarget,
      isUploading,
      uploadFailed,
      onReupload,
      onRemove,
    } = this.props;
    return connectDragSource(connectDropTarget(
      <div
        style={{
          display: 'inline-block',
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 4,
          boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 100,
            backgroundImage: `url(${preview})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
          }}
        />
        <div
          style={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          {isUploading
            ? <b>uploading</b>
            : null
          }
          {uploadFailed
            ? <div>
              <b>Upload Failed</b>&nbsp;
              <a href="#" onClick={onReupload}>
                Retry
              </a>
            </div>
            : null
          }
          {!isUploading && !uploadFailed
            ? <RaisedButton
              secondary={true}
              onTouchTap={onRemove}
              icon={
                <FontIcon
                  className="material-icons"
                >
                  clear
                </FontIcon>
              }
              style={{
                width: '100%',
                marginBottom: 0,
              }}
            />
            : null
          }
        </div>
      </div>,
    ));
  }
}

export {
  File as FileItemComponent,
};
export default dragSource(Types.FILE, fileSource, collect)(
  dropTarget(Types.FILE, fileTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))(File));
