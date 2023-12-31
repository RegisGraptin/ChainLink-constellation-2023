import { Button } from "../Button"
import { Inputfield } from "../Inputfield"

export const Step3 = (props: any) => {

    return (
        <>
            <div className="flex flex-col justify-center items-center space-y-16 mt-20">
                <p className="text-red-400 font-bold text-2xl">Choose ENS Name for Wrap</p>
                <Inputfield />
                <div className="columns-2">
                    <Button onClick={() => props.nextPage()}>Set ENS Name</Button>
                    <Button onClick={() => props.nextPage()}>Skip</Button>
                </div>
            </div>
        </>
    )
}