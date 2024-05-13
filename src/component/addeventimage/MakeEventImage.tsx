import { FC } from "react"
import "./index.scss"

const MakeEventImage:FC= ()=>{
    return(
        <div className="Createheader">
            <div></div>
            <img src="https://s3-alpha-sig.figma.com/img/2e07/6d64/385642e5d482db14204739d55ac435fa?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jftfg3-clCGWUmRGle5Rsi3bcGt6RBhEldRfxrJkZukhH45bBp29EsjK7I8KGFQT6YXSK17NpZgTLQtksjgLD9kK4E8KV4ejzQ5h5xBFn6ATGn7IWgj0B2CHfta96ru0A2baJm7sKbei1nM0lDkqV5Wy-4LCPYWMpVVnh5rE4WNYpYTuM5epQGJt2dQ8hMDxcNlAQYUmORI-8Q0rJm5u-atIR4Uqeh4xCiJMx~uN~LR5BNNjfDnli5goCt7yMWm4nzUKCRN6k5WBrfzSE8k0~X5ydcQ2WQgtxoabKs4tnAEeUstVr8Wk2tsBN6RJ-tWmC0vYLuZeM-wobBus1DzuMg__" alt="" />
            <div className="rightside">
                <header>Make your own Event </header>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                <button><p>Create Events</p></button>
            </div>
            <div></div>
        </div>
    )
}

export default MakeEventImage