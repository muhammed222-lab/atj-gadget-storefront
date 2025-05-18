
import React from 'react';
import { User, Mail, Calendar } from 'lucide-react';

const AdminUserList = () => {
  // For demo purposes, hardcoded users
  const sampleUsers = [
    {
      id: 'u1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      registeredDate: '2023-01-15',
      orderCount: 3,
      totalSpent: 245.97
    },
    {
      id: 'u2',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      registeredDate: '2023-02-22',
      orderCount: 1,
      totalSpent: 129.99
    },
    {
      id: 'u3',
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      registeredDate: '2023-03-10',
      orderCount: 5,
      totalSpent: 789.45
    },
    {
      id: 'u4',
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      registeredDate: '2023-04-05',
      orderCount: 2,
      totalSpent: 178.50
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-medium">Customer Management</h2>
        <span className="text-gray-500 text-sm">
          {sampleUsers.length} users in database
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registered Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={20} className="text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail size={12} className="mr-1" /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center">
                    <Calendar size={14} className="mr-1 text-gray-400" />
                    {new Date(user.registeredDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.orderCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${user.totalSpent.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 text-center text-gray-500">
        <p>This is a demo view. In a real implementation, this would be connected to your user database.</p>
      </div>
    </div>
  );
};

export default AdminUserList;
