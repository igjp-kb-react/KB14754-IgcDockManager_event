import "./index.css";
import { useEffect, useRef, useState } from "react";
import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { IgcDockManagerComponent, IgcPaneCloseEventArgs } from "igniteui-dockmanager";
import { IgcDockManagerPaneType, IgcSplitPaneOrientation } from "igniteui-dockmanager";

/* eslint-disable */
declare global {
  namespace JSX {
      // tslint:disable-next-line:interface-name
      interface IntrinsicElements {
          "igc-dockmanager": any;
      }
  }
}
/* eslint-enable */

defineCustomElements();

function App() {
  const dockManagerRef = useRef<IgcDockManagerComponent>(null);

  useEffect(() => {
    dockManagerRef.current.layout = {
      rootPane: {
          type: IgcDockManagerPaneType.splitPane,
          orientation: IgcSplitPaneOrientation.horizontal,
          panes: [
              {
                  type: IgcDockManagerPaneType.splitPane,
                  orientation: IgcSplitPaneOrientation.vertical,
                  size: 200,
                  panes: [ 
                    createContentPane("pane1", "Pane 1"), 
                    createContentPane("pane2", "Pane 2") ]
              },
              {
                  type: IgcDockManagerPaneType.splitPane,
                  orientation: IgcSplitPaneOrientation.vertical,
                  size: 200,
                  panes: [ 
                    createContentPane("pane3", "Pane 3"), 
                    createContentPane("pane4", "Pane 4") ]
              }
          ]
      }
    };

    const paneClose = (ev: CustomEvent<IgcPaneCloseEventArgs>) => {
      console.log(ev.detail);
    };
    dockManagerRef.current.addEventListener("paneClose", paneClose);
    return () => {
        dockManagerRef.current.removeEventListener("paneClose", paneClose);
    };
  }, []);

  const createContentPane = (contentID: string, paneHeader: string): any => {
    const pane = {
        header: paneHeader,
        type: IgcDockManagerPaneType.contentPane,
        contentId: contentID
    };
    return pane;
  }

  return (
    <>
      <igc-dockmanager ref={dockManagerRef} id="dockManager">
          <div slot="content1" className="dockManagerContent">Content 1</div>
          <div slot="content2" className="dockManagerContent">Content 2</div>
          <div slot="content3" className="dockManagerContent">Content 3</div>
          <div slot="content4" className="dockManagerContent">Content 4</div>
          <div slot="content5" className="dockManagerContent">Content 5</div>
          <div slot="content6" className="dockManagerContent">Content 6</div>
          <div slot="content7" className="dockManagerContent">Content 7</div>
          <div slot="content8" className="dockManagerContent">Content 8</div>
          <div slot="content9" className="dockManagerContent">Content 9</div>
      </igc-dockmanager>
    </>
  );
}

export default App;
