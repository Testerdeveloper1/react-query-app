
import React, { useState, useEffect } from 'react';
// import { TreeTable, TreeTableSelectionKeysType, TreeTableSelectionEvent } from 'primereact/treetable';
// import { Column } from 'primereact/column';
// import { TreeNode } from 'primereact/treenode';
import { NodeService,NewNodeService } from '../service/NodeService';
import { TreeTable, TreeTableSelectionEvent, TreeTableSelectionKeysType } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { Tree, TreeSelectionEvent } from 'primereact/tree';

export default function DeepTable() {
    const [inputText, setInputText] = useState('');

    const [nodes, setNodes] = useState([]);
    const [selectedNodeKeys, setSelectedNodeKeys] = useState();
    function useCopyToClipboard() {
        const [result, setResult] = useState<
          null | { state: 'success' } | { state: 'error'; message: string }
        >(null);
       
        const copy = async (text: string) => {
          try {
            await navigator.clipboard.writeText(text);
            setResult({ state: 'success' });
          } catch (e) {
            setResult({ state: 'error', message: e.message });
            throw e;
          } finally {
            // 👇 Show the result feedback for 2 seconds
            setTimeout(() => {
              setResult(null);
            }, 2000);
          }
        };
      
        // 👇 We want the result as a tuple
        return [copy, result] as const;
      }
  
  // 👇 Using our custom hook
  const [copyToClipboard, copyResult] = useCopyToClipboard();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClickCopy = () => {
    // Copy the text from the input field into the clipboard
    copyToClipboard(inputText);
  };

  const [dataToCopy, setDataToCopy] = useState('This is the data to copy.');

  const handleCopy = () => {
    // navigator.clipboard.writeText(NodeService);
  };
    useEffect(() => {
        NewNodeService.getTreeNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div className="card">
          <Tree  value={nodes} selectionMode="checkbox" 
  selectionKeys={selectedNodeKeys} 
  onSelectionChange={(e: TreeSelectionEvent) => {setSelectedNodeKeys(e.value) ,console.log(selectedNodeKeys)}}
  tableStyle={{ minWidth: '50rem' }}>
  <Column  field="name" header="Name" expander></Column>
</Tree>
                <div>
      <input
        type="text"
        value={dataToCopy}
        onChange={(e) => setDataToCopy(NewNodeService)}
      />
      <button onClick={handleCopy}>Copy to Clipboard</button>
    </div>
    <div>
      <input value={inputText} onChange={handleChangeInput} />
      <button onClick={handleClickCopy}>Copy to clipboard</button>
      <div>
      	// 👇 Showing the results in the UI (for 2 seconds)
        {copyResult?.state === 'success' && 'Copied successfully!'}
        {copyResult?.state === 'error' && `Error: ${copyResult.message}`}
      </div>
            {/* <Tree value={nodes} selectionMode="checkbox" 
            selectionKeys={selectedNodeKeys} 
            // onSelectionChange={(e: TreeTableSelectionEvent) => setSelectedNodeKeys(e.value)}
             tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" expander></Column>
                {/* <Column field="size"  +++++++ header="Size"></Column> */}
                {/* <Column field="type" header="Type"></Column> */}
         {/* </Tree> */}
         

         
    </div>
        </div>
    )}