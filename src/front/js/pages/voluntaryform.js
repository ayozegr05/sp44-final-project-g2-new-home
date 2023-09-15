import React, { useState, useEffect, useContext } from "react";
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";


export const VoluntaryForm = () => {
  const { actions, store } = useContext(Context);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate()
  const initialFormData = {
    name: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
    time: "",
    description: "",
    availability: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [emailError, setEmailError] = useState(null);

  useEffect(() => {
    // Guarda los datos del formulario en el almacenamiento local cada vez que cambian
    localStorage.setItem("animalFormData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const valitimeEmail = (email) => {
    // Expresión regular para validar direcciones de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validar el campo de email
    if (!valitimeEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return; // No envíes el formulario si el email no es válido
    } else {
      setEmailError(null); // Restablecer el error si el email es válido
    }
    if(formData.availability == ""){
      console.log(formData)
      formData.availability = "Morning"
      
    }
    // Aquí puedes agregar la lógica para enviar el formulario
    await actions.volunteer(
      formData.address,
      formData.city,
      formData.zipCode,
      formData.phone,
      formData.email,
      formData.description,
      formData.availability,
      store.user_id
      // Asegúrate de que peopleId esté definido y disponible
    );
    navigate("/");
    // Limpiar el formulario después de enviar
    setFormData(initialFormData);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">
            <b>Voluntary Form</b>
          </h5>
          <div className="form-group row">
            <div className="col-md-4">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <label>Address:</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <label>City:</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-3">
              <label>Zip Code:</label>
              <input
                type="text"
                className="form-control"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label>Phone:</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label>Email:</label>
              <input
                type="email"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>
            <div className="col-md-3">
            <label>Availability:</label>
              <select
                className="form-control"
                name="availability"
                value={formData.availability}
                onChange={handleSelectChange}
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
            <button className="btn btn-primary" onClick={handleFormSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};