import Navbar from './Navbar';
import {Fira_Sans} from "next/font/google";

const fira = Fira_Sans({weight: '400', subsets: ['latin']});

const Layout = ({ children }) => {
    return (
        <div className={`alef ${fira.className} bg-customBackground min-h-screen`}>
            <Navbar />
            <div className="container mx-auto max-w-screen-lg">
                {children}
            </div>
        </div>
    );
};

export default Layout;
