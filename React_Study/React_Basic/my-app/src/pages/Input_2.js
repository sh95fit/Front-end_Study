import React, {useState} from "react";


const Input_2 = () => {
    const [inputs, setInputs] = useState({
        name : "",
        email : "",
        tel : ""
    });

    const {name, email, tel} = inputs

    const change = (e) => {
        const value = e.target.value;
        const id = e.target.id;

        setInputs({
            ...inputs,
            [id]: value
        });
    };

    return (
        <div>
            <div>
                <label>이름</label>
                <input type="name" id="name" value={name} onChange={change}/>
            </div>
            <div>
                <label>이메일</label>
                <input type="email" id="email" value={email} onChange={change}/>
            </div>
            <div>
                <label>연락처</label>
                <input type="tel" id="tel" value={tel} onChange={change}/>
            </div>
            <div>
            <p>이름 : {name}</p>
            <p>이메일 : {email}</p>
            <p>연락처 : {tel}</p>
            </div>
        </div>
    );
}

export default Input_2