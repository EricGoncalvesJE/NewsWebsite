export default function AboutUs() {
    return (
        <main className="container dark:bg-sky-950 m-4 bg-sky-500 text-center mx-auto p-8">
            <div className="container dark:bg-slate-950 bg-white py-8">
                <span className="text-6xl font-bold">
                    About
                    <span className="mx-4 bg-gradient-to-b from-white to-sky-600 bg-clip-text text-transparent">
                        TechNerd
                    </span>
                </span>

                <p className="dark:text-sky-100 px-24 py-4 text-slate-950">
                    Welcome to TechNerds, your premier destination for the latest and greatest in technology news, reviews, and insights. Founded by a group of passionate tech enthusiasts, we're dedicated to bringing you the most accurate, up-to-date information on the ever-evolving tech landscape.
                </p>
                <section className="my-8">
                    <h2 className="text-4xl font-bold dark:text-sky-100 text-slate-950">Our Mission</h2>
                    <p className="dark:text-sky-100 px-24 py-4 text-slate-950 text-xl">
                        At TechNerds, we believe that technology has the power to change the world. Our mission is to inform, educate, and inspire our readers by providing comprehensive coverage of tech trends, emerging gadgets, and innovative solutions that shape our future.
                    </p>
                </section>
                <section className="my-8">
                    <h2 className="text-4xl font-bold dark:text-sky-100 text-slate-950">What We Offer</h2>
                    <ul className="dark:text-sky-100 px-24 py-4 text-slate-950 text-xl">
                        <li>Daily News Updates: Stay ahead of the curve with our daily articles covering the newest developments in tech.</li>
                        <li>In-Depth Reviews: Get honest, detailed evaluations of the latest devices, software, and services.</li>
                        <li>Expert Analysis: Gain insights from industry professionals who dissect complex tech topics for our readers.</li>
                        <li>How-To Guides: Whether you're a beginner or a tech guru, our tutorials and tips will help you make the most of your tech.</li>
                        <li>Community Engagement: Join the conversation in our forums where tech lovers discuss ideas, solutions, and more.</li>
                    </ul>
                </section>
                <section className="my-8">
                    <h2 className="text-4xl font-bold dark:text-sky-100 text-slate-950">Our Values</h2>
                    <ul className="list-disc pl-5 dark:text-sky-100 px-24 py-4 text-slate-950 text-xl">
                        <li>Integrity: We pledge to deliver truthful reporting and unbiased opinions.</li>
                        <li>Curiosity: We constantly seek out new knowledge and innovative technologies.</li>
                        <li>Excellence: We strive for accuracy and excellence in everything we publish.</li>
                        <li>Community: We foster a welcoming environment for all tech enthusiasts to learn and grow.</li>
                    </ul>
                </section>
                <section className="my-8">
                    <h2 className="text-4xl font-bold dark:text-sky-100 text-slate-950">Join Us</h2>
                    <p className="dark:text-sky-100 px-24 py-4 text-slate-950 text-xl">
                        Whether you're a tech professional, a gadget geek, or just curious about the digital world, TechNerds is here for you. Explore our site, engage with our content, and become part of a community that's at the forefront of the tech revolution.
                    </p>
                    <p className="my-24 dark:text-sky-100 px-96 py-12 text-slate-950 text-xl">
                        We're more than just a news site; we're a hub for the tech-minded. Welcome to TechNerds – where curiosity meets technology.
                    </p>
                </section>
            </div>
        </main >
    );
}