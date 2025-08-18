"use client";
import { serviceBenefits } from "../../../../lib/data";

export default function ServiceBenefits() {
	return (
		<>
			<div className="py-8 md:py-12 overflow-hidden" style={{ background: "rgba(3, 95, 15, 0.05)" }}>
				<div className="px-4 sm:px-8 md:px-12 lg:px-[300px]">
					<div className="flex flex-row items-start justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
						{serviceBenefits.map((benefit, index) => (
							<div key={index} className="flex items-center">
								{/* Service Benefit Item */}
								<div className="flex flex-col items-center gap-2 md:gap-3">
									<img
										src={benefit.icon}
										alt={benefit.alt}
										className="w-12 h-12 md:w-16 md:h-16"
									/>
									<span 
										className="text-center"
										style={{
											color: "#333",
											fontSize: "clamp(10px, 1.4vw, 14px)",
											fontStyle: "normal",
											fontWeight: 600,
											lineHeight: "normal",
											letterSpacing: "-0.36px",
											width: "clamp(70px, 18vw, 180px)"
										}}
									>
										{benefit.title}
									</span>
								</div>

								{/* Divider - Show between items */}
								{index < serviceBenefits.length - 1 && (
									<div className="flex items-center justify-center mx-2 sm:mx-4 md:mx-6 lg:mx-8">
										<div className="w-px bg-gray-300" style={{ height: "80px" }}></div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="border-b border-black/10 w-[80%] mt-6 mx-auto"></div>
		</>
	);
}
