import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../Redux/ContactActions";
import { useState } from "react";
import { Link } from "react-router-dom";

function AddContacts() {
  // fetch contact from store
  const contact = useSelector((state) => state);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const dispatch = useDispatch();

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // email is unique or not
    const checkEmail = contact.users.find(
      (ele) => ele.email === newContact.email
    );
    // phone number is unique or not
    const checkPhone = contact.users.find(
      (ele) => ele.phone === newContact.phone
    );

    // check all fields are filled
    if (!newContact.name || !newContact.email || !newContact.phone) {
      return toast.warning("Please fill in all fields!");
    }

    // if email is already exist
    if (checkEmail) {
      return toast.warning("This email is already exist");
    }
    // if phone number is alreay exist
    if (checkPhone) {
      return toast.warning("This phone number is already exist");
    }

    // post new contact to api
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, newContact)
      .then((response) => {
        // empty input fileds
        setNewContact({
          name: "",
          email: "",
          phone: "",
        });
        // success notification
        toast.success("Contact Added Successfully");
        // dispatch addcontact with response data
        dispatch(addContact(response.data));
      })
      // if any error while posting
      .catch((error) => window.alert(error));
  };

  return (
    <div className="container py-5">
      <div className="row">
        <h1 className="display-3 text-center pt-5">Add Contact</h1>
        <div className="col-md-6 rounded shadow mx-auto">
          <form
            onSubmit={submitHandler}
            className="form-group  d-flex flex-column justify-around p-5 "
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-control m-2"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control m-2"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="form-control m-2"
              value={newContact.phone}
              onChange={(e) =>
                setNewContact({ ...newContact, phone: e.target.value })
              }
            />
            <button className="btn btn-block btn-success m-2" type="submit">
              Add Contact
            </button>
            <Link to="/" className="btn btn-block btn-primary m-2">
              Go back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContacts;
