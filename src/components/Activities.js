import React, { useState, useEffect, useRef } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import axios from "axios";
import DataTable from "react-data-table-component";

const Activites = () => {
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const columns = [
        { 
            name: 'Date',
            selector: row => row._id.createdAt,
            sortable: true
        }, {
            name: 'Type',
            selector: row => row._id.type,
            sortable: true  
        }, {
            name: 'Count',
            selector: row => row.count,
            sortable: true
        }];

    const initialized = useRef(false)
    const [activites, setActivites] = useState([]);
    const [filtered, setFiltered] = useState([]);

    function handleFilter(event){
        const data = activites;
        const newData = data.filter(row => {
            return row._id.type.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setFiltered(newData);
    }
    useEffect(() => {
        if (!initialized.current) {
          (async () => {
            try {
              const result = await axios.get(`${BACKEND_URL}/activity`);
              setActivites(result.data);
            } catch (error) {
              console.error(error.response.data);
            }
          })();
          initialized.current = true  
        }
        },[]);
    return <><Header />
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            </div>
            <div class="container">
            <h4 class="display-4">Activites</h4>
            <div class="col-md-8 order-md-1"></div>
            <div className="text-end"><input type="text" placeholder="Search by Type" onChange={handleFilter}/></div>
            <DataTable columns={columns} data={filtered?.length ? filtered:activites} pagination></DataTable>
            </div>
            <Footer />
           </>; 
}
export default Activites;