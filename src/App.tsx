import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import LazyVirtualScrollDemo from './VirtualLoader';
import DerivedState from './_components/DerivedState';
import ReorderHookform from './_components/ReorderWithReactHookForm';
import BasicDemo from './_components/Products';
import { QueryClient, QueryClientProvider } from 'react-query';
import CheckboxRowSelectionDemo from './_components/SelectionIssue';

const queryClient = new QueryClient();

 function App() {
  
 return (
  
 <div>
  <BasicDemo/>
  {/* <DerivedState/> */}
  {/* <DefferUpdate/> */}
   {/* <LazyVirtualScrollDemo/>
  <ReorderHookform/> */}
  {/* <div className='text-center'>
    {postsQuery.data.map(post=>(
      <div key={post.id}> {post.title}</div>
    ))}
    <button className='bg-blue text-blue p-2 border-2 border-black ' disabled={newPostMutation.isLoading} onClick={()=> newPostMutation.mutate('new post')}>
      add new 
    </button>
  
  </div>

 <SimpleReactHookform/>
 <ReorderHookform/>
 <div>
 {items.map((item) => (
   <div key={item.key}>
     <Checkbox 
       name={item.name} 
       checked={checkedItems[item.name] || false} 
       onChange={handleCheckboxChange} 
       label={`${item.label} (${item.key})`}
     />
   </div>
 ))}
 </div> */}
 </div>
 )
}

export default App;



