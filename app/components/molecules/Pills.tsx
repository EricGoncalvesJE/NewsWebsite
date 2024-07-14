export default function Pills() {
	return (
		<>
			<button className="rounded-2xl border-b-4 border-blue-400 bg-sky-700 px-4 py-2 font-bold text-white transition hover:border-b-2 hover:border-blue-500 hover:bg-blue-400">
				Learn more
			</button>
			<p className="rounded-full bg-cyan-500 px-4 py-1 text-black">Open</p>
			<p className="rounded-full bg-white px-4 py-1 text-black">Draft</p>
			<p className="rounded-full bg-amber-400 px-4 py-1 text-black"> Caution</p>
			<p className="rounded-full bg-green-700 px-4 py-1">Approved</p>
			<p className="rounded-full bg-red-800 px-4 py-1">Declined</p>
		</>
	)
}
