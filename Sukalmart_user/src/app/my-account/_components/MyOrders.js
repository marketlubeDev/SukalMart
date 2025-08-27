"use client";

import React from "react";

export default function MyOrders() {
	const orders = [
		{
			id: "ORD-001",
			date: "2024-01-15",
			status: "Delivered",
			total: "₹3,398",
			items: [
				{ name: "Glow & Hydrate Face Serum", quantity: 1, price: "₹899" },
				{ name: "Luxury Beauty Collection Set", quantity: 1, price: "₹2,499" }
			]
		},
		{
			id: "ORD-002",
			date: "2024-01-10",
			status: "In Transit",
			total: "₹1,899",
			items: [
				{ name: "Professional Hair Shampoo", quantity: 1, price: "₹899" },
				{ name: "Nourishing Hair Conditioner", quantity: 1, price: "₹999" }
			]
		}
	];

	const getStatusColor = (status) => {
		switch (status) {
			case "Delivered":
				return "bg-green-100 text-green-800";
			case "In Transit":
				return "bg-blue-100 text-blue-800";
			case "Processing":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="bg-white rounded-lg p-4 sm:p-6">
			<h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">My Orders</h2>

			<div className="space-y-3 sm:space-y-4">
				{orders.map((order) => (
					<div key={order.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
							<div>
								<h3 className="font-medium text-gray-900 text-sm sm:text-base">Order #{order.id}</h3>
								<p className="text-xs sm:text-sm text-gray-600">Placed on {order.date}</p>
							</div>
							<div className="sm:text-right">
								<p className="font-medium text-gray-900 text-sm sm:text-base">{order.total}</p>
								<span className={`px-2 py-1 text-[10px] sm:text-xs rounded-full ${getStatusColor(order.status)}`}>
									{order.status}
								</span>
							</div>
						</div>

						<div className="space-y-2">
							{order.items.map((item, index) => (
								<div key={index} className="flex justify-between text-xs sm:text-sm">
									<span className="text-gray-600">
										{item.name} (Qty: {item.quantity})
									</span>
									<span className="text-gray-900">{item.price}</span>
								</div>
							))}
						</div>

						<div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
							<button className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 text-xs sm:text-sm cursor-pointer">
								View Details
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
} 