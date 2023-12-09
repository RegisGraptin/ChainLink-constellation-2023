import { NextPage } from "next"
import { Header } from "../../components/Header";
import { useState } from 'react';
import { Step1 } from "../../components/CreateGift/Step1"
import { Step2 } from "../../components/CreateGift/Step2";
import { Step3 } from "../../components/CreateGift/Step3";
import { Step4 } from "../../components/CreateGift/Step4";
import { Step5 } from "../../components/CreateGift/Step5";
import { Step6 } from "../../components/CreateGift/Step6";

const CreateCardPage: NextPage = () => {

    const [pageIndex, setPageIndex] = useState(0);
    const [eventType, setEventType] = useState("");

    // Here all my page components
    const pageComponents = [
        <Step1 key="step1" nextPage={nextPage} />, 
        <Step2 key="step2" nextPage={nextPage} setEventType={setEventType}/>, 
        <Step3 key="step3" nextPage={nextPage} address="0x00" />,
        <Step4 key="step4" nextPage={nextPage} />,
        <Step5 key="step5" nextPage={nextPage} />,
        <Step6 key="step5" nextPage={nextPage} />
    ];

    function nextPage() {
        // Update to the next pages
        if (pageIndex < pageComponents.length - 1) {
            setPageIndex(pageIndex + 1);
        } else {
            // TODO :: No more pages available --> Redirect?
        }
    }

    function prevPage() {
        // Update to the next pages
        if (pageIndex < pageComponents.length - 1) {
            setPageIndex(pageIndex - 1);
        } else {
            // TODO :: No more pages available --> Redirect?
        }
    }
    
    return (
        <>
        <Header/>
            <main>

                <div className="container mx-auto">
                    {pageComponents[pageIndex]}
                </div>

                <button 
                    type="button" 
                    className="focus:outline-none mt-40 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={nextPage}>
                        Go to the next page
                </button>
                <button 
                    type="button" 
                    className="focus:outline-none mt-40 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={prevPage}>
                        Go to the Prev page
                </button>

                {/* Progress bar - use a variable int to see how much page we still need */}
                <div className="fixed bottom-0 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-red-400 h-2.5 rounded-full" style={{width: ((pageIndex + 1) / pageComponents.length) * 100 + "%"}}></div>
                </div>

            </main>
        </>
    )

}


export default CreateCardPage;