import ClickEvent from "./ClickEvent";
import EventObject from "./EventObject";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";

export default function Lab4() {

    function sayHello() {
        alert("Hello");
    }
    
    return (
        <div>
            <ClickEvent />
            <PassingDataOnEvent />
            <PassingFunctions theFunction={() => sayHello()} />
            <EventObject />
        </div>
    )
}