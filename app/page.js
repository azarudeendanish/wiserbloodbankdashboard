'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "./ui/dashboard/cards";
import axios from "axios";
import LatestDonors from "./ui/dashboard/donor-count";
// let totalPaidInvoices = '3'
// let totalPendingInvoices = '20'
// let numberOfCustomers = '500'
// let numberOfInvoices = '30'
export default function Home() {
  const [apidata, setApiData] = useState([])
  const [donorCount, setDonorCount] = useState(0)
  const getUserData = () => {
    try {
        const res = axios.get('/api/donors');
        const data = res?.data;
        console.log('donor user api data=>  ', res);
        console.log('donor user api data=>  ', data);
        if (data) {
            setApiData(data);
            setDonorCount(data.length);
            console.log(data.length);
        }
    } catch (error) {
        console.log('api error');
    }
}

useEffect(() => {
    getUserData();
}, [donorCount]);
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Donors Count" value={donorCount} type="customers" />
        <Card title="Blood Added" value={donorCount} type="pending" />
        <Card title="Blood Issued" value={donorCount} type="invoices" />
        <Card
          title="Blood unit available"
          value={donorCount}
          type="customers"
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-2">
        <div>
         <LatestDonors latestDonors={apidata && apidata} />
        </div>
      </div>
    </>
  );
}
