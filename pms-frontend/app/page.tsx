"use client";
import React, { useState } from 'react';
import SendingData from './sendingData/page';
import Link from 'next/link';
import AuthPage from './auth/page';

function Home() {

  return (
    <div>

      <nav>
        <h1>Products Management System</h1>
      </nav>

      <main>
        <h2>Welcome to the Products Management System</h2>
        <p>Manage your products efficiently and effectively.</p>

        <AuthPage/>
        {/* <SendingData /> */}
        {/* <Link href="/receivingData">View products</Link> */}
      </main>

      <footer>
        <p>&copy; 2024 Products Management System</p>
      </footer>

    </div>
  );
}
export default Home;
