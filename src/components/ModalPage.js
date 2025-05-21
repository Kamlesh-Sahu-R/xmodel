import './ModalPage.css';
import { useState, useRef, useEffect } from 'react';

function ModalPage() {

    const modalRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        dob: "",
    });


    useEffect(()=>{

        function clickOutSide(e){
            if(modalRef.current && !modalRef.current.contains(e.target)){
               setShowModal(false); 
            }
        }
        if(showModal){
            document.addEventListener("mousedown", clickOutSide);
        }else{
            document.removeEventListener("mousedown", clickOutSide);
        }

        return () =>{
            document.removeEventListener("mousedown", clickOutSide);
        };

    }, [showModal]);

    const handalChange = (e) =>{
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        //Validation of Phone number 
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(formData.phone)) {
            alert("Invalid phone number. Please enter a 10-digit number.");
            return;
        };

        //Validation of DOB
        const today = new Date().toISOString().split("T")[0];
        if(formData.dob > today){
            alert("Invalid date of birth. Date of birth cannot be in the future.");
            return;
        }

        setShowModal(false);

        //After Submission set to default
        setFormData({
            username: "",
            email: "",
            phone: "",
            dob: "",
        });
    };

    return (
        <div>
            <div className='model-page'>
                <h1>User Details Modal</h1>
                <button onClick={handleOpenModal}>Open Form</button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content" ref={modalRef}>
                        <h2>Fill Details</h2>
                        <form onSubmit={handleSubmit}>
                                <h4>Username:</h4>
                                <input
                                    id = "username"
                                    type = "text"
                                    value = {formData.username}
                                    onChange={handalChange}
                                    required
                                />
                                <h4>Email Address:</h4>
                                <input
                                    id = "email"
                                    type = "email"
                                    value = {formData.email}
                                    onChange={handalChange}
                                    required
                                />
                                <h4>Phone Number:</h4>
                                <input
                                    id = "phone"
                                    type = "tel"
                                    value = {formData.phone}
                                    onChange={handalChange}
                                    required
                                />
                                <h4>Date of Birth:</h4>
                                <input
                                    id = "dob"
                                    type = "date"
                                    value = {formData.dob}
                                    onChange={handalChange}
                                    required
                                />
                            <button className="submit-button" type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalPage;