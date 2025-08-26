"use client";

import React from "react";

export default function SavedAddress() {
	const savedAddresses = [
		{
			id: 1,
			name: "Sample Username",
			address: "House No. 12, Vattiyoorkavu, 695013, Thiruvananthapuram, KL, IN",
			phone: "+91 9999 444 555",
			isDefault: true
		},
		{
			id: 2,
			name: "Work Address",
			address: "Office Building, Technopark, 695581, Thiruvananthapuram, KL, IN",
			phone: "+91 8888 777 666",
			isDefault: false
		}
	];

	return (
		<div className="bg-white rounded-lg p-4 sm:p-6">
			<div className="flex items-center justify-between mb-4 sm:mb-6">
				<h2 className="text-lg sm:text-xl font-semibold text-gray-900">Saved Addresses</h2>
				<button className="px-3 py-2 sm:px-4 sm:py-2 text-sm bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary)]/90 transition-colors cursor-pointer">
					Add New Address
				</button>
			</div>

			<div className="space-y-3 sm:space-y-4">
				{savedAddresses.map((address) => (
					<div key={address.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
						<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
							<div className="flex-1">
								<div className="flex items-center space-x-2 mb-2">
									<h3 className="font-medium text-gray-900 text-sm sm:text-base">{address.name}</h3>
									{address.isDefault && (
										<span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] sm:text-xs rounded-full">
											Default
										</span>
									)}
								</div>
								<p className="text-gray-600 text-xs sm:text-sm mb-1">{address.address}</p>
								<p className="text-gray-600 text-xs sm:text-sm">{address.phone}</p>
							</div>
							<div className="flex space-x-3 sm:space-x-2 sm:self-start sm:mt-0 mt-1">
								<button className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 text-xs sm:text-sm cursor-pointer">Edit</button>
								<button className="text-red-600 hover:text-red-700 text-xs sm:text-sm cursor-pointer">Delete</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
} 