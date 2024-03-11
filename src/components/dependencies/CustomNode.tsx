import React from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import { NODE_COLOR_HOVER } from '../../utils';

const CustomNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <div
      style={{
        background: data.isHighlighted ? NODE_COLOR_HOVER : data.background,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      {data.label}
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
    </div>
  );
};

export default CustomNode;