'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  MessageSquare,
  Building2,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

// Sample data - replace with real data from your backend
const stats = [
  {
    name: 'Total Projects',
    value: '48',
    change: '+12%',
    changeType: 'positive',
    icon: Building2,
  },
  {
    name: 'Active Inquiries',
    value: '24',
    change: '+8%',
    changeType: 'positive',
    icon: MessageSquare,
  },
  {
    name: 'Client Satisfaction',
    value: '98%',
    change: '+2%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Revenue Growth',
    value: '32%',
    change: '+18%',
    changeType: 'positive',
    icon: TrendingUp,
  },
];

const recentProjects = [
  {
    id: 1,
    name: 'Kilimani Heights',
    status: 'In Progress',
    type: 'Residential',
    value: 'KES 45M',
    completion: '65%',
  },
  {
    id: 2,
    name: 'Tech Park Office Complex',
    status: 'Planning',
    type: 'Commercial',
    value: 'KES 120M',
    completion: '25%',
  },
  {
    id: 3,
    name: 'Garden City Mall Renovation',
    status: 'Completed',
    type: 'Commercial',
    value: 'KES 80M',
    completion: '100%',
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: 'Client Meeting - Kilimani Heights',
    date: '2024-02-01',
    type: 'Meeting',
  },
  {
    id: 2,
    title: 'Site Inspection - Tech Park',
    date: '2024-02-03',
    type: 'Inspection',
  },
  {
    id: 3,
    title: 'Project Proposal Review',
    date: '2024-02-05',
    type: 'Review',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden p-6">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    stat.changeType === 'positive'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <div className="border-b border-gray-200 bg-white px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Projects
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-6"
                >
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {project.type} • {project.value}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        project.status === 'Completed'
                          ? 'bg-green-50 text-green-700'
                          : project.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {project.completion}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div className="border-b border-gray-200 bg-white px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Upcoming Tasks
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(task.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                    {task.type}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
