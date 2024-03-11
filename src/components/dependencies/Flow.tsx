import React, { useCallback, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, Node, Edge, useNodesState, useEdgesState } from 'react-flow-renderer';
import CustomNode from './CustomNode';
import { EDGE_COLOR, EDGE_COLOR_HOVER, FLOW_BACKGROUND_COLOR, FLOW_BACKGROUND_GAP } from '../../utils';

const nodeTypes = {
  custom: CustomNode
};

type FlowProps = {
  flowNodes: Node[];
  flowEdges: Edge[];
};

const Flow: React.FC<FlowProps> = ({
  flowNodes,
  flowEdges,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  useEffect(() => {
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges]);

  const highlightNodesAndEdges = useCallback((nodeId: string, highlight: boolean) => {
    const connectedNodeIds: { nodes: string[]; edges: string[] } = { nodes: [nodeId], edges: [] };

    edges.forEach((edge) => {
      if (edge.source === nodeId || edge.target === nodeId) {
        if (!connectedNodeIds.nodes.includes(edge.source)) {
          connectedNodeIds.nodes.push(edge.source);
        }
        if (!connectedNodeIds.nodes.includes(edge.target)) {
          connectedNodeIds.nodes.push(edge.target);
        }
        connectedNodeIds.edges.push(edge.id);
      }
    });

    setNodes((nds) => 
      nds.map((node: Node) => ({
        ...node,
        data: {
          ...node.data,
          isHighlighted: connectedNodeIds.nodes.includes(node.id) ? highlight : node.data.isHighlighted,
        },
      }))
    );

    setEdges((eds) =>
      eds.map((edge: Edge) => ({
        ...edge,
        data: {
          ...edge.data,
          isHighlighted: connectedNodeIds.edges.includes(edge.id) ? highlight : edge.data.isHighlighted,
        },
        style: {
          stroke: connectedNodeIds.edges.includes(edge.id) && highlight ? EDGE_COLOR_HOVER : EDGE_COLOR,
        },
      }))
    );

  }, [edges, setNodes, setEdges]);

  const onNodeMouseEnter = useCallback((event: any, node: Node) => {
    highlightNodesAndEdges(node.id, true);
  }, [highlightNodesAndEdges]);

  const onNodeMouseLeave = useCallback((event: any, node: Node) => {
    highlightNodesAndEdges(node.id, false);
  }, [highlightNodesAndEdges]);
  
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeMouseEnter={onNodeMouseEnter}
      onNodeMouseLeave={onNodeMouseLeave}
      nodeTypes={nodeTypes}
    >
      <MiniMap />
      <Controls />
      <Background color={FLOW_BACKGROUND_COLOR} gap={FLOW_BACKGROUND_GAP} />
    </ReactFlow>
  );
};

export default Flow;