import React, { useState, useEffect, useRef } from "react";
import "./CompForm.css";
import { MoveLeft, User, Phone, Mail, MapPin, Upload } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function CompForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const photoInputRef = useRef(null);

    const [formData, setFormData] = useState({
        issueType: "road",
        title: "",
        description: "",
        location: "",
        pinCode: "",
        photo: null,
        fullName: "",
        mobileNumber: "",
        email: ""
    });

    const categoryColors = {
        road: "#F23D3D",
        water: "#33C7CC",
        garbage: "#6FE63C",
        electricity: "#E0D231",
        others: "#7e13d0"
    };
    const currentCategoryColor = categoryColors[formData.issueType] || "#000000";

    useEffect(() => {
        if (location.state?.selectedCategory) {
            setFormData((prev) => ({
                ...prev,
                issueType: location.state.selectedCategory
            }));
        }
    }, [location.state]);

    useEffect(() => {
        const firstName = sessionStorage.getItem("firstName");
        const lastName = sessionStorage.getItem("lastName");
        const phone = sessionStorage.getItem("phone");
        const emailID = sessionStorage.getItem("email");

        setFormData(prev => ({ ...prev, fullName: `${firstName} ${lastName}`.trim(), mobileNumber: phone, email: emailID }))
    }, []);

    function handleBack() {
        navigate("/home");
    };

    function handleChange(e) {
        const { name, value, files } = e.target;        //name attribute of the input you are coming from, value is whatever user typed, files are all the first file of the possible multiple files uploaded by the user and we are checking if there are any files upload, if yes then put it in the variable otherwise put the string value in the variable
        setFormData({
            ...formData,            //spreading forData so that other fields are not disturbed
            [name]: files && files.length > 0 ? [...files] : value
        });
    };

    function handleRemove(i) {
        setFormData((prev) => {
            const updatedFiles = prev.photo.filter((_, index) => index !== i);
            if (photoInputRef.current) {
                const dataTransfer = new DataTransfer();
                updatedFiles.forEach((f) => dataTransfer.items.add(f));
                photoInputRef.current.files = dataTransfer.files;
            }
            return {
                ...prev, photo: updatedFiles.length > 0 ? updatedFiles : null
            };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (formData.pinCode.length !== 6) {
            alert("Pincode should be 6 digits");
            return;
        }
        const forms = new FormData();
        forms.append("formData", JSON.stringify(formData));
        if (formData.photo && Array.isArray(formData.photo)) {
            formData.photo.forEach((file) => {
                forms.append("photo", file);
            });
        }
        try {
            const response = await fetch('http://localhost:4000/setComplaint', {
                method: "POST",
                body: forms,
            })
            const data = await response.json();
            console.log("Backend response data:", data);
            if (response.ok && data.success) {
                navigate("/registered", {state: {trackId: data.trackid}});
            } else {
                alert("Failed to submit complaint. Please try again in some time.");
            }
        }catch(err){
            console.log("Database error: ", err);
            alert("Couldn't connect to servers. Please try again in some time.");
        }
    };

    return (
        <div className="complaint_form_container">
            <div className="btn_container">
                <button className="back_btn" onClick={() => { handleBack() }}><span className="back_btn_span"><MoveLeft /></span>Back</button>
            </div>
            <div className="complaint_subcontainer">
                <h1>Complaint Form</h1>
                <p>We will help your comlaint to reach the appropriate authorities </p>
            </div>
            <div className="complaint_form">
                <form onSubmit={handleSubmit}>
                    <div className="category">
                        <label>Type of Issue:</label>
                        <select name="issueType" value={formData.issueType} style={{ backgroundColor: `${currentCategoryColor}` }} onChange={handleChange}>
                            <option value="road">Road</option>
                            <option value="water">Water</option>
                            <option value="garbage">Garbage</option>
                            <option value="electricity">Electricity</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <br />
                    <label>*Title:</label>
                    <input type="text" name="title" placeholder="Briefly give a title to your problem" onChange={handleChange} required />
                    <br /><br />
                    <label>Description:</label>
                    <textarea name="description" placeholder="Describe the problem in detail" rows="10" onChange={handleChange}></textarea>
                    <br /><br />
                    <div className="location_pin_container">
                        <div className="loaction">
                            <label><span><MapPin size={15} /></span>  *Location/Full Address:</label>
                            <input type="text" name="location" placeholder="House Address, landmark" onChange={handleChange} required />
                        </div>
                        <div className="pin">
                            <label><span><MapPin size={15} /></span>  *Pin Code:</label>
                            <input type="number" name="pinCode" placeholder="Pin Code" onChange={handleChange} required />
                        </div>
                    </div>
                    <br /><br />
                    <label>Photo Evidence (if any):</label>
                    <label htmlFor="photo_input" className="custom_file_upload">
                        {!formData.photo && <div className="upload_container">
                            <Upload size={40} strokeWidth={1} />
                            <p>Click to browse in your device</p>
                        </div>}
                    </label>
                    {formData.photo && formData.photo.length > 0 && <div className='fileList'>
                        <p>Selected Photos:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>File Size</th>
                                    <th> Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.photo.map((files, index) => (
                                    <tr key={index}>
                                        <td>{files.name}</td>
                                        <td>{(files.size / 1024).toFixed(1)}KB</td>
                                        <td><button type="button" className='removeBtn' onClick={() => handleRemove(index)}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>}

                    <input type="file" id="photo_input" name="photo" onChange={handleChange} multiple ref={photoInputRef} accept="image/*" />


                    <br /><br />
                    <h3>Contact Information</h3>
                    <p className="left_align">Please check if your contact information is correct. If you find any information that is incorrect please change in the profile section.</p>
                    <div className="contact_info_container">
                        <div className="contact">
                            <label><User size={17} />  Full Name:</label>
                            <input type="text" name="fullName" value={formData.fullName} disabled style={{ color: '#1E1E1E' }} />
                        </div>

                        <div className="contact">
                            <label><Phone size={17} />  Mobile Number:</label>
                            <input type="number" name="mobileNumber" value={formData.mobileNumber} disabled style={{ color: '#1E1E1E' }} />
                        </div>

                        <div className="contact">
                            <label><Mail size={17} />  Email Address:</label>
                            <input type="email" name="email" value={formData.email} disabled style={{ color: '#1E1E1E' }} />
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