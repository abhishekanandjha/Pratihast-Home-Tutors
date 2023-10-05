"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { error } from "console";
import axios from "axios";
import styles from "./SignupPage.module.css"; // Import your CSS module

const notify = () => toast("Will Call You Soon.");

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    schoolName: "",
    subject: "",
    noOfClassesPerWeek: 3,
    tutorMode: "",
    class: "",
    genderRestriction: "",
    whatsappNumber: "",
    classRequiredFrom: "",
    email: "",
    note: "",
  });
  
  const [activeSection, setActiveSection] = useState<number>(1);
  const [isFormValid, setIsFormValid1] = useState<boolean>(false);
  const [isFormValid2, setIsFormValid2] = useState<boolean>(false);
  const [buttonDisabled, setbuttonDisabled] = useState<boolean>(false);
  const [Loading,setLoading] = useState<boolean>(false);
  const resetForm = () => {
    setUser({
      name: "",
      schoolName: "",
      subject: "",
      noOfClassesPerWeek: 3,
      tutorMode: "",
      class: "",
      genderRestriction: "",
      whatsappNumber: "",
      classRequiredFrom: "",
      email: "",
      note: "",
    });
    setActiveSection(1);
    setIsFormValid1(false);
    setIsFormValid2(false);
  };

  useEffect(() => {
    validateForm();
    if (isFormValid2) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  // Validate the form and update isFormValid state
  const validateForm = () => {
    const {
      name,
      schoolName,
      subject,
      noOfClassesPerWeek,
      tutorMode,
      class: userClass,
      genderRestriction,
      whatsappNumber,
      classRequiredFrom,
      email,
    } = user;

    const isSection1Valid =
      name.trim() !== "" &&
      schoolName.trim() !== "" &&
      subject.trim() !== "" &&
      noOfClassesPerWeek >= 1 &&
      noOfClassesPerWeek <= 7 &&
      userClass.trim() !== "" &&
      tutorMode.trim() !== "" &&
      genderRestriction.trim() !== "";

    const isSection2Valid =
      whatsappNumber.trim() !== "" &&
      whatsappNumber.match(/^\d{10}$/) !== null &&
      classRequiredFrom.trim() !== "" &&
      email.trim() !== "";

    if (isSection1Valid) {
      setIsFormValid1(isSection1Valid);
    } else {
      setIsFormValid1(false);
    }

    if (isSection2Valid) {
      setIsFormValid2(isSection2Valid);
    } else {
      setIsFormValid2(false);
    }
    console.log(isFormValid);
  };

  // Method to handle next button click
  const onNextClick = () => {
    if (activeSection === 1) {
      validateForm(); // Validate before moving to Section 2
      console.log("onnextclick " + isFormValid);
      if (isFormValid) {
        setActiveSection(2);
      }
    } else if (activeSection === 2) {
      // You can perform additional validation or actions here
      // For example, you can submit the form data to a backend server
      // and navigate to the next page
    }
  };

  const onPreviousClick = () => {
    if (activeSection === 2) {
      setIsFormValid1(false);
      setActiveSection(1);
    }
  };

  const onSignup = async () => {
    // You can submit the form data or perform other actions here
    try {
      // setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // src\app\api\users\signup

      console.log(response.data);
      if (response.status === 200) {
        setLoading(false);
        notify();
        resetForm();
      } else {
        console.log(response.status + ": " + "axios error: ");
      }
    } catch (e: any) {
      console.log(e.message + "error sending form data, please try again");
      toast.error(e.message);
    } // finally{
    //   console.log(user);

    //   // notify();
    //   resetForm();
    //   router.push("/login");
    // }
    // console.log(user);
    // resetForm();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>signup page</h1>
      {activeSection === 1 && (
        <div className={styles.formSection}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
            placeholder="Name"
            required
          />

          <label htmlFor="schoolName">School/College Name</label>
          <input
            id="schoolName"
            type="text"
            value={user.schoolName}
            onChange={(e) => {
              setUser({ ...user, schoolName: e.target.value });
            }}
            placeholder="Sahyadri School."
            required
          />

          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            value={user.subject}
            onChange={(e) => {
              setUser({ ...user, subject: e.target.value });
            }}
            placeholder="Science & Maths"
            required
          />

          <label htmlFor="noOfClassesPerWeek">No. Of Classes per Week</label>
          <select
            id="noOfClassesPerWeek"
            value={user.noOfClassesPerWeek}
            onChange={(e) => {
              const inputValue = parseInt(e.target.value, 10);

              if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 7) {
                setUser({ ...user, noOfClassesPerWeek: inputValue });
              }
            }}
            required
          >
            <option value="" disabled defaultChecked>
              Select No. Of Classes
            </option>
            {[...Array(8).keys()].map((value) => (
              <option key={value} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>

          <label htmlFor="class">Class</label>
          <select
            id="class"
            value={user.class}
            onChange={(e) => {
              setUser({ ...user, class: e.target.value });
            }}
            required
          >
            <option value="" disabled defaultChecked>
              Select Class
            </option>
            {[...Array(12).keys()].map((index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
            <option value="Pre-Primary(Nur-UKG)">Pre-Primary(Nur-UKG)</option>
            <option value="graduation">Graduation</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="genderRestriction">Gender Restriction</label>
          <select
            id="genderRestriction"
            value={user.genderRestriction}
            onChange={(e) => {
              setUser({ ...user, genderRestriction: e.target.value });
            }}
            required
          >
            <option value="" disabled defaultChecked>
              Select Tutor{" "}
            </option>
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label htmlFor="tutorMode">Tuition Mode</label>
          <select
            id="tutorMode"
            value={user.tutorMode}
            onChange={(e) => {
              setUser({ ...user, tutorMode: e.target.value });
            }}
            required
          >
            <option value="" disabled defaultChecked>
              Select Tuition Mode
            </option>
            <option value="Own Home">Own Home</option>
            <option value="Online">Online</option>
            <option value="Tutor's Home">Tutor's Home</option>
          </select>

          <button type="button" onClick={onNextClick}>
            Next
          </button>
        </div>
      )}

      {activeSection === 2 && (
        <div className={styles.formSection}>
          <label htmlFor="whatsappNumber">WhatsApp Number (10 digits)</label>
          <input
            id="whatsappNumber"
            type="tel"
            pattern="[0-9]{10}"
            value={user.whatsappNumber}
            onChange={(e) => {
              setUser({ ...user, whatsappNumber: e.target.value });
            }}
            placeholder="1234567890"
            required
          />
          <label htmlFor="classRequiredFrom">Class Required From</label>
          <input
            id="classRequiredFrom"
            type="date"
            value={user.classRequiredFrom}
            onChange={(e) => {
              setUser({ ...user, classRequiredFrom: e.target.value });
            }}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="example@example.com"
            required
          />
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            value={user.note}
            onChange={(e) => {
              setUser({ ...user, note: e.target.value });
            }}
            placeholder="Write your note here..."
          />
          <div className={styles.buttons}>
            <button
              className={styles.prevButton}
              type="button"
              onClick={onPreviousClick}
            >
              Previous
            </button>
            <button
              className={`${styles.nextButton} ${
                buttonDisabled && styles.disabled
              }`}
              type="submit"
              onClick={() => {
                notify(); // Call the notify function after onSignup
                onSignup();
              }}
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "complete the form" : " Send"}
            </button>
          </div>
          <Toaster />;
        </div>
      )}
    </div>
  );
}
