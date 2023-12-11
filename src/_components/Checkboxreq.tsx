import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function MyCheckbox() {
 const items = [
  { key: '1', label: 'label 1', name: 'disconn api', status: true },
  { key: '2', label: 'label 2', name: 'conn api', status: false },
  { key: '3', label: 'label 3', name: 'other api', status: true },
  { key: '4', label: 'label 4', name: 'another api', status: false },
  { key: '5', label: 'label 5', name: 'last api', status: true },
 ];

 const [checkedItems, setCheckedItems] = useState(items.reduce((acc, item) => ({ ...acc, [item.name]: item.status }), {}));

 const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;
  setCheckedItems({ ...checkedItems, [name]: checked });
 };
 const  mutate  = useQuery('apiRequest', async () => {
  await axios.post('/api/endpoint', checkedItems);
 });
 return (
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
    <button onClick={() => mutate()}>Submit</button>
  </div>
 );
}
n