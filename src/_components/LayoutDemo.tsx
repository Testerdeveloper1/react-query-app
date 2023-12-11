
import React, { useState, useEffect } from 'react';
import { DataTable, DataTableSelectionChangeEvent, DataTableSelectAllChangeEvent,
    DataTablePageEvent, DataTableSortEvent, DataTableFilterEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerSNervice } from './service/CustomerService';
import { NodeService as CustomerService } from '../service/NodeService';

interface Country {
    name: string;
    code: string;
}

interface Representative {
    name: string;
    code: string;
}

interface Customer {
    id: number;
    name: string;
    country: Country;
    company: string;
    date: string;
    status: string;
    verified: boolean;
    activity: number;
    representative: Representative;
    balance: number;
}

interface LazyTableState {
    first: number;
    rows: number;
    page: number;
    sortField?: string;
    sortOrder?: number;
    filters: DataTableFilterMeta;
}

export default function LazyLoadDemo<T extends LazyTableState>({ columns,onstateChange,startslot,endslot,...props}:LazyTableState<T>) {
    const [loading, setLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [customers, setCustomers] = useState<Customer[] | null>(null);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[] | null>(null);
    const [lazyState, setlazyState] = useState<LazyTableState>({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {
            name: { value: '', matchMode: 'contains' },
            'country.name': { value: '', matchMode: 'contains' },
            company: { value: '', matchMode: 'contains' },
            'representative.name': { value: '', matchMode: 'contains' }
        }
    });

    let networkTimeout = null;

    useEffect(() => {
        loadLazyData();
    }, [lazyState]);

    const loadLazyData = () => {
        setLoading(true);

        if (networkTimeout) {
            clearTimeout(networkTimeout);
        }

        //imitate delay of a backend call
        networkTimeout = setTimeout(() => {
            CustomerService.getCustomers({ lazyEvent: JSON.stringify(lazyState) }).then((data) => {
                setTotalRecords(data.totalRecords);
                setCustomers(data.customers);
                setLoading(false);
            });
        }, Math.random() * 1000 + 250);
    };

    const onPage = (event: DataTablePageEvent) => {
        setlazyState(event);
    };

    const onSort = (event: DataTableSortEvent) => {
        setlazyState(event);
    };

    const onFilter = (event: DataTableFilterEvent) => {
        event['first'] = 0;
        console.log(event)
        setlazyState(event);
    };

    const onSelectionChange = (event: DataTableSelectionChangeEvent) => {
        const value = event.value;
        console.log(event)
        setSelectedCustomers(value);
    
        setSelectAll(value.length === totalRecords);
    };

    const onSelectAllChange = (event: DataTableSelectAllChangeEvent) => {
        const selectAll = event.checked;

        if (selectAll) {
            CustomerService.getCustomers().then((data) => {
                setSelectAll(true);
                setSelectedCustomers(data.customers);
            });
        } else {
            setSelectAll(false);
            setSelectedCustomers([]);
        }
    };
    type ObjectKeys = keyof Record<string, any>;

    function filterObjectKeys(object: Record<string, any>, excludedKeys: ObjectKeys[] = []): Record<string, any> {
      const filteredKeys = Object.keys(object) as ObjectKeys[];
      const filteredObject = {} as Record<string, any>;
      for (const key of filteredKeys) {
        if (!excludedKeys.includes(key)) {
          filteredObject[key] = object[key];
        }
      }
    
      return filteredObject;
    }
    
    const securityObject = {
      id: 1,
      name: 'Admin',
      role: 'Administrator',
      permissions: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      userId: '123456',
      password: 'hashedPassword',
      email: 'admin@example.com',
      phoneNumber: '1234567890',
      lastLogin: '2023-11-11T00:00:00Z',
      createdAt: '2023-10-10T00:00:00Z',
      updatedAt: '2023-11-11T00:00:00Z',
    };
    
    // Filter the object keys to exclude the 'zero' field.
    const filteredObject = filterObjectKeys(securityObject, ['email']);
    
    // Log the filtered object.

    function appendField(object: Record<string, any>, objectOfParams: Record<string, any>, stringCheckedOnit: string): Record<string, any> {
        for (const [key, value] of Object.entries(objectOfParams)) {
          if (key && value && !key.includes(stringCheckedOnit)) {
            object[key] = value;
          }
        }
        return object;
      }
      console.log(appendField(securityObject,{newdfield:'jamal'},'updatedAt'))
      const representativeBodyTemplate = (rowData: Customer) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={rowData.representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${rowData.representative.image}`} width={32} />
                <span>{rowData.representative.name}</span>
            </div>
        );
    };

    const countryBodyTemplate = (rowData: Customer) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
                <span>{rowData.country.name}</span>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={customers} lazy filterDisplay="row" dataKey="id" paginator
                    first={lazyState.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                    onSort={onSort} sortField={lazyState.sortField} sortOrder={lazyState.sortOrder}
                    onFilter={onFilter} filters={lazyState.filters} loading={loading} tableStyle={{ minWidth: '75rem' }}
                    selection={selectedCustomers} onSelectionChange={onSelectionChange} selectAll={selectAll} onSelectAllChange={onSelectAllChange}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                <Column field="name" header="Name" sortable filter filterPlaceholder="Search" />
                <Column field="country.name" sortable header="Country" filterField="country.name" body={countryBodyTemplate} filter filterPlaceholder="Search" />
                <Column field="company" sortable filter header="Company" filterPlaceholder="Search" />
                <Column field="representative.name" header="Representative" body={representativeBodyTemplate} filter filterPlaceholder="Search" />
            </DataTable>
        </div>
    );
}
        