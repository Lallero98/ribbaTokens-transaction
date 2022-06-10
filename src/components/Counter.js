import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import React from "react";

export default function Counter() {
    return(
    <CountUp end={1102394} redraw={true} suffix=" Of people using Ribba Token!">
        {({countUpRef, start}) => (
            <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef}/>
            </VisibilitySensor>
        )}
    </CountUp>
    );
}
