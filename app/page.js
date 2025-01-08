'use client'
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Card } from "./ui/dashboard/cards";
import axios from "axios";
import { CardSkeleton } from "./ui/skeletons";
// let totalPaidInvoices = '3'
// let totalPendingInvoices = '20'
// let numberOfCustomers = '500'
// let numberOfInvoices = '30'
export default function Home() {
  const [apidata, setApiData] = useState([])
  const [donorCount, setDonorCount] = useState(0)
  const [bloodAPositive, setBloodAPositive] = useState(0)
  const [bloodANegative, setBloodANegative] = useState(0)
  const [bloodBPositive, setBloodBPositive] = useState(0)
  const [bloodBNegative, setBloodBNegative] = useState(0)
  const [bloodABPositive, setBloodABPositive] = useState(0)
  const [bloodABNegative, setBloodABNegative] = useState(0)
  const [bloodOPositive, setBloodOPositive] = useState(0)
  const [bloodONegative, setBloodONegative] = useState(0)

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
        setBloodAPositive(data.filter((item) => item.bloodgroup == 'A+').length)
        setBloodANegative(data.filter((item) => item.bloodgroup == 'A-').length)
        setBloodBPositive(data.filter((item) => item.bloodgroup == 'B+').length)
        setBloodBNegative(data.filter((item) => item.bloodgroup == 'B-').length)
        setBloodABPositive(data.filter((item) => item.bloodgroup == 'AB+').length)
        setBloodABNegative(data.filter((item) => item.bloodgroup == 'AB-').length)
        setBloodOPositive(data.filter((item) => item.bloodgroup == 'O+').length)
        setBloodONegative(data.filter((item) => item.bloodgroup == 'O-').length)
        // let filterData = data.filter((item)=> item.bloodgroup == 'A+');
        // console.log(filterData.length);



      }
    } catch (error) {
      console.log('api error');
    }
  }

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {donorCount ? <Card title="Donors Count" value={donorCount} type="customers" /> : <CardSkeleton />}
      </div>
      <div className="mt-5 mb-2">Blood Stock</div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bloodAPositive ? <Card title="A+" value={bloodAPositive} type="blood" /> : ''}
        {bloodANegative ? <Card title="A-" value={bloodANegative} type="blood" /> : ''}
        {bloodBPositive ? <Card title="B+" value={bloodBPositive} type="blood" /> : ''}
        {bloodBNegative ? <Card title="B-" value={bloodBNegative} type="blood" /> : ''}
        {bloodABPositive ? <Card title="AB+" value={bloodABPositive} type="blood" /> : ''}
        {bloodABNegative ? <Card title="AB-" value={bloodABNegative} type="blood" /> : ''}
        {bloodOPositive ? <Card title="O+" value={bloodOPositive} type="blood" /> : ''}
        {bloodONegative ? <Card title="O-" value={bloodONegative} type="blood" /> : ''}
      </div>
      {/* <Card title="Total Invoices" value={numberOfInvoices} type="blood" />
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
      </div> */}
    </>
  )
}
