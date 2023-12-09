import TextBox from "../TextBox"

export const Step2 = (props:any) => {

    const wrappSelection = (eventType:any) => {
        console.log(eventType)
        props.setEventType(eventType);
        props.nextPage();

    }

    return (
        <>
            <div className="flex flex-col justify-center items-center space-y-16 mt-20">
            <p className="text-red-400 font-bold text-2xl">Choose occasion</p>
            <div className="grid grid-cols-3 gap-3">
            <TextBox onClick={() => wrappSelection("Birthday")}>Birthday</TextBox>
            <TextBox onClick={() => wrappSelection("Anniversary")}>Anniversary</TextBox>
            <TextBox onClick={() => wrappSelection("House Warming")}>House Warming</TextBox>
            <TextBox onClick={() => wrappSelection("Retirement")}>Retirement</TextBox>
            <TextBox onClick={() => wrappSelection("Wedding")}>Wedding</TextBox>
            <TextBox onClick={() => wrappSelection("Christmas")}>Christmas</TextBox>
            </div>

            </div>
        </>
    )
}