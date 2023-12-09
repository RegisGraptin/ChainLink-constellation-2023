import TextBox from "../TextBox"

export const Step2 = (props:any) => {

    return (
        <>
            <div className="flex flex-col justify-center items-center space-y-16 mt-20">
            <p className="text-red-400 font-bold text-2xl">Choose occasion</p>
            <div className="grid grid-cols-3 gap-3">
            <TextBox>Birthday</TextBox>
            <TextBox>Anniversary</TextBox>
            <TextBox>House Warming</TextBox>
            <TextBox>Retirement</TextBox>
            <TextBox>Wedding</TextBox>
            <TextBox>Christmas</TextBox>
            </div>

            </div>
        </>
    )
}