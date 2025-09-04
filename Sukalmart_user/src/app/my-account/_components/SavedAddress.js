"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/_components/common/Button";
import { useLanguage } from "@/app/_components/context/LanguageContext";
import { t } from "@/lib/translations";

export default function SavedAddress() {
	const router = useRouter();
	const { language } = useLanguage();
	
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

	const handleAddNewAddress = () => {
		// Navigate to checkout page with address form open
		router.push('/checkout?showAddressForm=true&scrollToCenter=true');
	};

	const handleDeleteAddress = (addressId) => {
		// Handle address deletion logic here
		console.log('Deleting address with ID:', addressId);
		// You can add confirmation modal or direct deletion logic
		// For now, just log the action
	};

	const handleDeleteClick = (e, addressId) => {
		e.preventDefault(); // Prevent default link behavior
		handleDeleteAddress(addressId);
	};

	return (
		<div className="bg-white rounded-lg p-4 sm:p-6">
			<div className="flex items-center justify-between mb-4 sm:mb-6">
				<h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t("account.savedAddress", language)}</h2>
				<Button 
				variant="primary"
				size="large"
				onClick={handleAddNewAddress}
				className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm md:text-base bg-[var(--color-primary)] text-white rounded-md transition-colors cursor-pointer" style={{ backgroundColor: "var(--color-primary)", transition: "background-color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#520a1e")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}>
					{t("account.addNewAddress", language)}
				</Button>
			</div>

			<div className="space-y-3 sm:space-y-4">
				{savedAddresses.map((address) => (
					<div key={address.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
						<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
							<div className="flex-1">
								<div className="flex items-center space-x-2 mb-2">
									<h3 className="font-medium text-gray-900 text-sm sm:text-base">{address.name}</h3>
																	{address.isDefault && (
									<span className="px-2 py-1 bg-[#F7F3F4] text-[#6D0D26] text-[10px] sm:text-xs rounded-full">
										{t("common.default", language)}
									</span>
								)}
								</div>
								<p className="text-gray-600 text-xs sm:text-sm mb-1">{address.address}</p>
								<p className="text-gray-600 text-xs sm:text-sm">{address.phone}</p>
							</div>
							<div className="flex space-x-3 sm:space-x-2 sm:self-start sm:mt-0 mt-1">
								<Link 
									href={`/checkout?showAddressForm=true&editAddress=${address.id}&scrollToCenter=true`}
									className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 text-xs sm:text-sm md:text-base cursor-pointer px-1 py-0.5 sm:px-2 sm:py-1 md:px-3 md:px-3 md:py-1.5 transition-colors"
								>
									{t("common.edit", language)}
								</Link>
								<Link 
									href="#"
									onClick={(e) => handleDeleteClick(e, address.id)}
									className="text-red-600 hover:text-red-700 text-xs sm:text-sm md:text-base cursor-pointer px-1 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 transition-colors"
								>
									{t("common.delete", language)}
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
} 