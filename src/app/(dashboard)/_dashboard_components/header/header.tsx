import React from 'react';
import StaticImage from "~/app/_components/general/StaticImage";
import {staticLogo} from "~/assets/exporter";

const Header = () => {
    return (
        <div className={'w-screen h-12 relative flex justify-between p-2 py-4 '}>
            <StaticImage src={staticLogo}/>
        </div>
    );
};

export default Header;