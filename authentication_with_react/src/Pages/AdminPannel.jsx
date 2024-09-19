import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Utils/FireBase';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatusCounts, setOrderStatusCounts] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (password === "hanzala321") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  useEffect(() => {
    if (authenticated) {
      const fetchData = async () => {
        try {
          const orderSnapshot = await getDocs(collection(db, "orders"));
          const orderData = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(orderData);
          setFilteredOrders(orderData); // Initially display all orders

          // Calculate order status counts
          const statusCounts = orderData.reduce((acc, order) => {
            const status = getOrderStatus(order.orderDate);
            acc[status] = (acc[status] || 0) + 1;
            return acc;
          }, {});
          setOrderStatusCounts(statusCounts);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchData();
    }
  }, [authenticated]);

  // Function to determine order status based on order date
  const getOrderStatus = (orderDate) => {
    if (!orderDate) return 'Unknown';
    const orderTime = new Date(orderDate);
    const currentTime = new Date();
    const hoursElapsed = Math.floor((currentTime - orderTime) / (1000 * 60 * 60));

    if (hoursElapsed <= 24) return 'Processing';
    if (hoursElapsed <= 48) return 'Shipped';
    return 'Done';
  };

  const totalOrders = orders.length;

  // Calculate the progress percentage of orders in each status
  const getProgressPercentage = (count) => {
    return totalOrders > 0 ? ((count / totalOrders) * 100).toFixed(2) : 0;
  };

  const renderOrderDetails = () => {
    if (selectedOrder === null) {
      return <p className="text-gray-500">No order selected</p>;
    }

    return (
      <div className="bg-gray-500 p-4 rounded-lg shadow-lg mt-6">
        <h3 className="text-xl font-semibold mb-4">Order Details</h3>
        <table className="w-full border border-gray-300 rounded-lg bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">User Email</th>
              <th className="p-3 text-left">Order Date</th>
              <th className="p-3 text-left">Total Items</th>
              <th className="p-3 text-left">Total Price</th>
              <th className="p-3 text-left">Delivery Charges</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-300">
              <td className="p-3">{selectedOrder.id}</td>
              <td className="p-3">{selectedOrder.user?.email || 'Unknown'}</td>
              <td className="p-3">{selectedOrder.orderDate ? new Date(selectedOrder.orderDate).toLocaleDateString() : 'N/A'}</td>
              <td className="p-3">{selectedOrder.items ? selectedOrder.items.length : 'N/A'}</td>
              <td className="p-3">{selectedOrder.totalAmount || 'N/A'}</td>
              <td className="p-3">{selectedOrder.deliveryCharge || 'N/A'}</td>
              <td className="p-3">{getOrderStatus(selectedOrder.orderDate)}</td>
            </tr>
            {selectedOrder.items && selectedOrder.items.length > 0 && (
              <tr>
                <td colSpan="7">
                  <div className="mt-4 bg-gray-200 p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold mb-2">Items Details</h4>
                    <table className="w-full border border-gray-300 rounded-lg bg-white">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-3 text-left">Products</th>
                          <th className="p-3 text-left">Name</th>
                          <th className="p-3 text-left">Category</th>
                          <th className="p-3 text-left">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id} className="border-t border-gray-300">
                            <td className="p-3">
                              <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover"/>
                            </td>
                            <td className="p-3">{item.title || 'N/A'}</td>
                            <td className="p-3">{item.category || 'N/A'}</td>
                            <td className="p-3">${item.price || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4">Admin Panel Access</h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Admin Orders Panel</h2>

        {/* Order Status Progress */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Order Status Progress</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(orderStatusCounts).map(([status, count]) => (
              <div key={status} className="bg-gray-200 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{status}</h3>
                <div className="mt-2 bg-gray-300 h-2 rounded">
                  <div
                    className="bg-blue-500 h-full rounded"
                    style={{ width: `${getProgressPercentage(count)}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-lg font-semibold">{count} orders</p>
              </div>
            ))}
          </div>
        </div>

        

        {/* All Orders Table */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">All Orders</h2>
          <table className="w-full border border-gray-300 rounded-lg bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">User Email</th>
                <th className="p-3 text-left">Order Date</th>
                <th className="p-3 text-left">Total Items</th>
                <th className="p-3 text-left">Total Price</th>
                <th className="p-3 text-left">Delivery Charges</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-300 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.user?.email || 'Unknown'}</td>
                    <td className="p-3">{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</td>
                    <td className="p-3">{order.items ? order.items.length : 'N/A'}</td>
                    <td className="p-3">{order.totalAmount || 'N/A'}</td>
                    <td className="p-3">{order.deliveryCharge || 'N/A'}</td>
                    <td className="p-3">{getOrderStatus(order.orderDate)}</td>
                    <td className="p-3 text-blue-500">View Details</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-3 text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {renderOrderDetails()}
      </div>
    </div>
  );
};

export default AdminPanel;
