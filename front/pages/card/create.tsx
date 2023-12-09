import { NextPage } from "next"
import { Header } from "../../components/Header"

import { useState } from 'react';
import { Step1 } from "../../components/CreateGift/Step1";
import { Step2 } from "../../components/CreateGift/Step2";

const CreateCardPage: NextPage = () => {

    // Here all my page components
    const pageComponents = [<Step1 key="step1" />, <Step2 key="step2" />,];

    const [pageIndex, setPageIndex] = useState(0);

    function nextPage() {
        // Update to the next pages
        if (pageIndex < pageComponents.length) {
            setPageIndex(pageIndex + 1);
        } else {
            // TODO :: No more pages available --> Redirect?
        }
    }

    return (
        <>
            <main>
                <Header />
                <h1>Create NFT Page</h1>

                {pageComponents[pageIndex]}


                <button 
                    type="button" 
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={nextPage}>
                        Go to the next page
                </button>

                {/* TODO :: Remove <br> but direclty at the bottom with css style */}
                <br /><br /><br /><br />

                {/* Progress bar - use a variable int to see how much page we still need */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "45%"}}></div>
                </div>
            </main>
        </>
    )

}


export default CreateCardPage;