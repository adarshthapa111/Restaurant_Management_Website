import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';
import AdminNavbar from './AdminNavbar';
import Swal from 'sweetalert2';

const AllOrder = () => {
  const [deliveryData, setDeliveryData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const deliveryRef = ref(db, 'deliveryForm');
      onValue(deliveryRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setDeliveryData(formattedData);
        } else {
          setDeliveryData([]);
        }
      });
    };

    fetchData();
  }, []);

  const handleDeleteOrder = (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this order!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove the order with the corresponding id from the database
        const orderRef = ref(db, `deliveryForm/${id}`);
        remove(orderRef)
          .then(() => {
            console.log('Order deleted successfully');
            // Show success message
            Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
            // You may want to update the state here to reflect the changes
          })
          .catch((error) => {
            console.error('Error deleting order: ', error);
            // Show error message
            Swal.fire('Error!', 'Failed to delete order.', 'error');
          });
      }
    });
  };

  return (
    <>
     <AdminNavbar />
      <div className="ml-64">
        <div className="font-david-libre text-2xl xl:text-4xl font-semibold p-4 text-center">
        ⇩ All Food Order are Listed ⇩
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-800 font-semibold uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-800 font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-800 font-semibold uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-800 font-semibold uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-800 font-semibold uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-800 font-semibold uppercase tracking-wider">
                Order Items
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-800 font-semibold uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deliveryData.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm capitalize">{entry.fullname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{entry.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm capitalize">{entry.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{entry.phonenumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">Rs.{entry.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                  <ul>
                    {entry.cartItems &&
                      entry.cartItems.map((item, index) => (
                        <li key={index}>
                          {item.foodName} - Quantity: {item.quantity}
                        </li>
                      ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-white bg-red-500 p-2 rounded-lg text-sm font-medium hover:text-red-700"
                  onClick={() => handleDeleteOrder(entry.id)}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    
  );
};

export default AllOrder;
