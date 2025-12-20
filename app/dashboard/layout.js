'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function Layout({ children }) {
    return (
        <DashboardLayout title="Home">
            {children}
        </DashboardLayout>
    );
}
