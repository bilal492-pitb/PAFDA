import { GripVertical } from 'lucide-react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

export const ResizablePanelGroup = ({ className, ...props }) => (
  <PanelGroup className={`d-flex h-100 w-100 ${className || ''}`} {...props} />
);

export const ResizablePanel = Panel;

export const ResizableHandle = ({ withHandle, className, ...props }) => (
  <PanelResizeHandle 
    className={`d-flex align-items-center justify-content-center ${className || ''}`}
    {...props}
  >
    {withHandle && (
      <div className="d-flex align-items-center justify-content-center rounded border bg-light" style={{ width: '20px', height: '20px' }}>
        <GripVertical size={10} />
      </div>
    )}
  </PanelResizeHandle>
);