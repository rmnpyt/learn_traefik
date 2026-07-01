"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FlowNodeData } from "@/types/config";
import { cn } from "@/lib/utils";
import type { Node } from "@xyflow/react";

type CustomNodeType = Node<FlowNodeData, "client" | "entrypoint" | "router" | "middleware" | "service">;

const nodeColors = {
  client: "bg-blue-500",
  entrypoint: "bg-emerald-500",
  router: "bg-violet-500",
  middleware: "bg-amber-500",
  service: "bg-rose-500",
};

function CustomNode({ data }: NodeProps<CustomNodeType>) {
  return (
    <div className={cn(
      "rounded-lg border-2 border-white/20 shadow-lg min-w-[140px]",
      data.status === "highlighted" && "ring-2 ring-primary ring-offset-2"
    )}>
      <div className={cn(
        "px-3 py-1.5 rounded-t-lg text-xs font-medium text-white flex items-center justify-between",
        nodeColors[data.type] || "bg-gray-500"
      )}>
        <span>{data.type.toUpperCase()}</span>
        {data.status === "active" && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
      </div>
      <div className="px-3 py-2 bg-card rounded-b-lg text-sm font-semibold">
        {data.label}
      </div>
      {data.meta && Object.keys(data.meta).length > 0 && (
        <div className="px-3 py-1.5 border-t border-border bg-surface/50 rounded-b-lg">
          {Object.entries(data.meta).slice(0, 3).map(([k, v]) => (
            <div key={k} className="text-[10px] text-muted flex justify-between gap-2">
              <span className="font-medium">{k}:</span>
              <span className="truncate max-w-[80px]">{v}</span>
            </div>
          ))}
        </div>
      )}
      <Handle type="target" position={Position.Left} className="!bg-muted !w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!bg-muted !w-2 !h-2" />
    </div>
  );
}

const nodeTypes = {
  client: CustomNode,
  entrypoint: CustomNode,
  router: CustomNode,
  middleware: CustomNode,
  service: CustomNode,
};

function ArchitectureFlowInner({ nodes: initialNodes, edges: initialEdges }: {
  nodes: any[];
  edges: any[];
}) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  return (
    <div className="h-[500px] w-full rounded-lg border border-border bg-surface/30">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Controls showInteractive={false} />
        <Background color="var(--border)" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}

export function ArchitectureFlow(props: { nodes: any[]; edges: any[] }) {
  return (
    <ReactFlowProvider>
      <ArchitectureFlowInner {...props} />
    </ReactFlowProvider>
  );
}
