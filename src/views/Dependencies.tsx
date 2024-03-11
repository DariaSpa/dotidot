import React, { useEffect, useState } from 'react';
import { Node, Edge } from 'react-flow-renderer';
import { fetchDependenciesData } from '../api';
import Flow from '../components/dependencies/Flow';

const Dependencies: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { nodes, edges } = await fetchDependenciesData();
      setNodes(nodes);
      setEdges(edges);
    };
    fetchData();
  }, []);

  return (
    <div className="h-[calc(100vh-7.5rem)]">
      <Flow 
        flowNodes={nodes}
        flowEdges={edges} />
    </div>
  );
};

export default Dependencies;
