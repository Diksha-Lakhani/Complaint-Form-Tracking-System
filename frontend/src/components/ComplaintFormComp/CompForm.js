import React, { useState, useEffect } from "react";
import "./CompForm.css";
import { MoveLeft, User, Phone, Mail, MapPin, Upload } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function CompForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const categoryColors = {
        Road: "#F23D3D",
        Water: "#33C7CC",
        Garbage: "#6FE63C",
        Electricity: "#E0D231",
        Others: "#7e13d0"
    };
    const handleBack = () => {
        navigate("/home");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/registered");
    };
    useEffect(() => {
        if (location.state?.selectedCategory) {
            setFormData((prev) => ({
                ...prev,
                issueType: location.state.selectedCategory
            }));
        }
    }, [location.state]);
    const [formData, setFormData] = useState({
        issueType: "Road",
        title: "",
        description: "",
        location: "",
        pinCode: "",
        photo: null,
        fullName: "",
        mobileNumber: "",
        email: ""
    });
    const handleChange = (e) => {
        const { name, value, files } = e.target;        //name attribute of the input you are coming from, value is whatever user typed, files[0] is the first file of the possible multiple files uploaded by the user and we are checking if there are any files upload, if yes then put it in the variable otherwise put the stirng value in the variable
        setFormData({
            ...formData,            //spreading forData so that other fields are not disturbed
            [name]: files ? files[0] : value
        });
    };
    const currentCategoryColor = categoryColors[formData.issueType] || "#000000";

    return (
        <div className="complaint_form_container">
            <div className="btn_container">
                <button className="back_btn" onClick={() => { handleBack() }}><span className="back_btn_span"><MoveLeft /></span>Back</button>
            </div>
            <div className="complaint_subcontainer">
                <h1>Complaint Form</h1>
                <p>We will help it to reach the appropriate authorities </p>
            </div>
            <div className="complaint_form">
                <form onSubmit={handleSubmit}>
                    <div className="category">
                        <label>Type of Issue:</label>
                        <select name="issueType" value={formData.issueType} style={{ backgroundColor: `${currentCategoryColor}`}} onChange={handleChange}>
                            <option value="Road">Road</option>
                            <option value="Water">Water</option>
                            <option value="Garbage">Garbage</option>
                            <option value="Electricity">Electricity</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <br />
                    <label>*Title:</label>
                    <input type="text" name="title" placeholder="Briefly title the problem" onChange={handleChange} required/>
                    <br /><br />
                    <label>Description:</label>
                    <textarea name="description" placeholder="Describe the problem in detail" rows="10" onChange={handleChange}></textarea>
                    <br /><br />
                    <div className="location_pin_container">
                        <div className="loaction">
                            <label><span><MapPin size={15} /></span>  *Location/Full Address:</label>
                            <input type="text" name="location" placeholder="House Address, landmark" onChange={handleChange} required/>
                        </div>
                        <div className="pin">
                            <label><span><MapPin size={15} /></span>  *Pin Code:</label>
                            <input type="number" name="pinCode" placeholder="Pin Code" onChange={handleChange} required/>
                        </div>
                    </div>
                    <br /><br />
                    <label>Photo Evidence (if any):</label>
                    <label htmlFor="photo_input" className="custom_file_upload">
                        <div className="upload_container">
                            <Upload size={40} strokeWidth={1} />
                            <p>Click to browse in your device</p>
                        </div>
                        <input type="file" id="photo_input" name="photo" onChange={handleChange} />
                    </label>

                    <br /><br />
                    <h3>Contact Information</h3>
                    <p className="left_align">So that we can contact you:</p>
                    <div className="contact_info_container">
                        <div className="contact">
                            <label><User size={17} />  *Full Name:</label>
                            <input type="text" name="fullName" placeholder="Enter full name" onChange={handleChange} required/>
                        </div>

                        <div className="contact">
                            <label><Phone size={17} />  *Mobile Number:</label>
                            <input type="number" name="mobileNumber" placeholder="Enter phone number" onChange={handleChange} required/>
                        </div>

                        <div className="contact">
                            <label><Mail size={17} />  Email Address:</label>
                            <input type="email" name="email" placeholder="Enter email address" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="submit_btn_container">
                        <button type="submit" className="submit_btn">Submit Form</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CompForm;