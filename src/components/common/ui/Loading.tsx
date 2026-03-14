export default function Loading(){
	return(
		<div className="w-full h-auto">
			<div className="w-[50%] mx-auto flex justify-center">
				<div className="animate-spin rounded-full h-16 w-16 border border-t-2 border-b-2 border-gray-500"></div>
			</div>
		</div>
	);
}