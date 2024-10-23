import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariables";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./ReduxExamples";
import AddRedux from "./ReduxExamples/AddRedux";
import CounterRedux from "./ReduxExamples/CounterRedux";
import HelloRedux from "./ReduxExamples/HelloRedux";
import TodoList from "./ReduxExamples/todos/TodoList";
import StringStateVariables from "./StringStateVariables";

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
            <Counter />
            <BooleanStateVariables />
            <StringStateVariables />
            <DateStateVariable />
            <ObjectStateVariable />
            <ArrayStateVariable />
            <ParentStateComponent />
            <ReduxExamples />
            <HelloRedux />
            <CounterRedux />
            <AddRedux />
            <TodoList />
        </div>
    )
}