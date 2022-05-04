import { useState } from "react";
import "./App.css";

function Mailer(props) {
  // button
  function removeClass(){  
    myButton.className = myButton.className.replace(new RegExp('(?:^|\\s)loading(?!\\S)'), '');
}

var myButton = document.getElementById('myButton');


myButton.addEventListener("click", function() {
    myButton.className = myButton.className + ' loading';
    setTimeout(removeClass, 2000);
}, false);


  const [mailerState, setMailerState] = useState({
    email: "",
    message: "",
  });

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const submitEmail = async (e) => {
    e.preventDefault();
    console.log({ mailerState });

    await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mailerState }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "success") {
          alert("Message Sent");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .then(() => {
        setMailerState({
          email: "",
          message: "",
        });
      });
  };

  return (
    <div className="form">
      <form onSubmit={submitEmail}>
        <fieldset>
          <div className="formBlock">
            <label>Enter recipient email address</label>
            <input
              onChange={handleStateChange}
              name="email"
              value={mailerState.email}
              className="user_details"
            />
            <label>Compose message to send</label>
            <textarea
              style={{ minHeight: "200px", marginBottom: "20px"}}
              onChange={handleStateChange}
              name="message"
              value={mailerState.message}
              className="user_details"
              />
          </div>

          <button id="myButton" class="button">Send</button>
        </fieldset>

      </form>
    </div>
  );
}

export default Mailer;