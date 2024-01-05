const Footer = () => {
    return (
        <footer className="p-6 dark:bg-card dark:text-gray-100 border-t border-x rounded-lg mt-[150px]">
            <div className="container grid grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
                <div className="flex flex-col space-y-4">
                    <h2 className="font-medium">Getting Started</h2>
                    <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
                        <a rel="noopener noreferrer" href="#">
                            How to Use
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Purchase Guide
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Product Updates
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Return Policy
                        </a>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <h2 className="font-medium">Products</h2>
                    <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
                        <a rel="noopener noreferrer" href="#">
                            Infinix Charger 2 in 1 33W
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            JBL Wireless Bluetooth Headset
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Veger Data Cable OTG
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Philips Heavy Bass Stereo Headset
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Alto Car Charger 2.1A
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Inbox Data Cable
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Card Reader
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Xiaomi Bm47 Battery
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            LCD USB Charger
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            LED Lamp
                        </a>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <h2 className="font-medium">About Us</h2>
                    <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
                        <a rel="noopener noreferrer" href="#">
                            Our Team
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Careers
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Customer Testimonials
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Contact Us
                        </a>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <h2 className="font-medium">Join Us</h2>
                    <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
                        <a rel="noopener noreferrer" href="#">
                            Affiliate Program
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Latest News
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Partnerships
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center px-6 pt-12 text-sm">
                <span className="dark:text-gray-400">
                    © Copyright 2024. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
