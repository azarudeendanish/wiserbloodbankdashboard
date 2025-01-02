'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "./ui/dashboard/cards";
import axios from "axios";
// let totalPaidInvoices = '3'
// let totalPendingInvoices = '20'
// let numberOfCustomers = '500'
// let numberOfInvoices = '30'
export default function Home() {
  const [apidata, setApiData] = useState([])
  const [donorCount, setDonorCount] = useState(0)
  const getUserData = async () => {
    try {
        const res = await axios.get('/api/donors');
        const data = await res?.data;
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
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
    </>
  );
}
