import React, {useEffect,useState} from 'react'

const Contact = () => {


    const [userData, setUserData]= useState({name:"",email:"", phone:"", message:""});

    const userContact = async () =>{
        try{

            const res = await fetch('/getdata', {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
                
            });

            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name,email:data.email, phone:data.phone});

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
             
        }
    }

    useEffect(() => {
        userContact();
    }, []);

    //we are storing data in states

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value });

    }

    //send data to backend
    const contactForm = async (e) => {
        e.preventDefault();

        const {name, email, phone, message} = userData;
        const res = await fetch('/contact', {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message

            })
        });

        const data = await res.json();

        if(!data){
            console.log("message not sent");
        }else {
            alert("message sent successfully");
            setUserData({...userData, message:""});
        }

    }


    return (
        <>
            
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                            {/*phone number*/}
                            <div className="contact_info_item d-flex justify-content-start align-item-center">
                                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                            
                            <div className="contact_info_content">
                                <div className="contact_info_title">
                                    Phone
                                </div>
                                <div className="contact_info_text">
                                    7858838388
                                </div>
                            </div>
                            </div>
                            {/*email*/}
                            <div className="contact_info_item d-flex justify-content-start align-item-center">
                                <img src="https://img.icons8.com/ultraviolet/24/000000/filled-message.png" alt="phone" />
                            
                            <div className="contact_info_content">
                                <div className="contact_info_title">
                                    Email
                                </div>
                                <div className="contact_info_text">
                                    anandsatyam26@gmail.com
                                </div>
                            </div>
                            </div>
                            {/*address*/}
                            <div className="contact_info_item d-flex justify-content-start align-item-center">
                                <img src="https://img.icons8.com/ultraviolet/24/000000/map-marker.png" alt="phone" />
                            
                            <div className="contact_info_content">
                                <div className="contact_info_title">
                                    Address
                                </div>
                                <div className="contact_info_text">
                                    BBSR
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        {/* conatc us form */}

        <div className="contact_form">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="contatc_form_container py-5">
                            <div className="contact_form_tittle">
                                Get in Touch
                            </div>
                            <form method="POST" id="contact_form">
                                <div className="contact_form_name d-flex justify-content-between align-item-between">
                                    <input type="text" id="contact_form_name" 
                                        className="contact_form_name input_field"
                                        name = "name"
                                        value={userData.name}
                                        onChange={handleInputs}
                                        placeholder="your name" required="true"
                                    />

                                    <input type="email" id="contact_form_email" 
                                        className="contact_form_email input_field"
                                        name = "email"
                                        value={userData.email}
                                        onChange={handleInputs}
                                        placeholder="your email" required="true"
                                    />

                                    <input type="number" id="contact_form_phone" 
                                        className="contact_form_phone input_field"
                                        name = "phone"
                                        value={userData.phone}
                                        onChange={handleInputs}
                                        placeholder="your phone number" required="true"
                                    />

                                </div>

                                <div className="contact_form_text mt-5">
                                    <textarea className="text_field contact_form_message" 
                                    name = "message"
                                    value={userData.message}
                                    onChange={handleInputs}
                                    placeholder="Message" cols="30" rows="10">

                                    </textarea>

                                </div>
                                <div className="contact_form_button">
                                    <button type="submit" className="button contact_submit_button"
                                    onClick={contactForm}>Send Message</button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
        </>
    )
}

export default Contact
