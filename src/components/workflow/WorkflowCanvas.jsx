import React from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
} from "reactflow";

import "reactflow/dist/style.css";

const nodes = [
  {
    id: "1",
    position: { x: 250, y: 50 },
    data: {
      label: "⚡ Connection Accepted",
    },
  },
  {
    id: "2",
    position: { x: 250, y: 180 },
    data: {
      label: "⏳ Wait 1 Day",
    },
  },
  {
    id: "3",
    position: { x: 250, y: 310 },
    data: {
      label: "📩 Send Message",
    },
  },
];

const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
  },
];

const WorkflowCanvas = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm h-[80vh] overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl text-gray-800">
            Workflow Canvas
          </h2>

          <p className="text-sm text-gray-500">
            Visual automation builder
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-2xl hover:bg-blue-700 transition">
          + Add Node
        </button>
      </div>

      <div className="h-[calc(80vh-90px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowCanvas;